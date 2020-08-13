---
id: Melhores
title: "Boas Práticas"
---

O guia a seguir é uma lista das melhores práticas coletadas e que geralmente recomendamos a todos os usuários. Não leve este guia como obrigatório, você pode escolher algumas delas de acordo com suas necessidades.

**Feel free to suggest your best practices to the Verdaccio community**.

## Registro Privado

You can add users and manage which users can access which packages.

É recomendado que você defina um prefixo para os seus pacotes privados, por exemplo `local-*` ou `@my-company/*`, assim todos os seus elementos privados ficarão assim: `local-foo`. This way you can clearly separate public packages from private ones.

    yaml
      packages:
        '@my-company/*':
          access: $all
          publish: $authenticated
         'local-*':
          access: $all
          publish: $authenticated
        '@*/*':
          access: $all
          publish: $authenticated
        '**':
          access: $all
          publish: $authenticated

Always remember, **the order of packages access is important**, packages are matched always top to bottom.

### Using public packages from npmjs.org

If some package doesn't exist in the storage, server will try to fetch it from npmjs.org. If npmjs.org is down, it serves packages from cache pretending that no other packages exist. **Verdaccio will download only what's needed (requested by clients)**, and this information will be cached, so if client will ask the same thing second time, it can be served without asking npmjs.org for it.

**Exemplo:**

If you successfully request `express@4.0.1` from this server once, you'll be able to do it again (with all it's dependencies) anytime even if npmjs.org is down. Entretanto `express@4.0.0` não será baixado até que seja realmente necessário para alguém. And if npmjs.org is offline, this server would say that only `express@4.0.1` (only what's in the cache) is published, but nothing else.

### Override public packages

Se você quiser usar uma versão modificada de algum pacote público `foo`, você pode apenas publicá-lo em seu servidor local, assim quando você digitar `npm install foo`, **ele vai considerar a instalação da sua versão**.

There's two options here:

1. Você deseja criar um **fork** separado e parar de sincronizar com a versão pública.
    
    If you want to do that, you should modify your configuration file so verdaccio won't make requests regarding this package to npmjs anymore. Inclua uma entrada separada para este pacote no `config.yaml` e remova a lista `npmjs` do `proxy` e reinicie o servidor.
    
    ```yaml
    packages:
      '@my-company/*':
        access: $all
        publish: $authenticated
        # comment it out or leave it empty
        # proxy:
    ```
    
    Quando você publicar o seu pacote localmente, **você provavelmente deve começar com uma string de versão maior que a existente**, para que ela não entre em conflito com o pacote existente no cache.

2. You want to temporarily use your version, but return to public one as soon as it's updated.
    
    Para evitar conflitos de versões, **você deve usar um sufixo de pré-lançamento personalizado da próxima versão do patch**. Por exemplo, se um pacote público tiver a versão 0.1.2, você poderá fazer upload de `0.1.3-my-temp-fix`.
    
    ```bash
    npm version 0.1.3-my-temp-fix
    npm --publish --tag fix --registry http://localhost:4873
    ```
    
    Desta forma, o seu pacote será usado até que seu mantenedor original atualize seu pacote público para `0.1.3`.

## Segurança

A segurança começa no seu ambiente, por isso recomendamos que leia **[10 npm Security Best Practices](https://snyk.io/blog/ten-npm-security-best-practices/)** e siga a recomendação.

### Permissões dos Pacotes

Por padrão, todos os pacotes que você publica no Verdaccio são acessíveis para todos os públicos, nós recomendamos que você proteja seu registro de usuários externos não autorizados, atualizando a propriedade `access` para `$authenticated`.

```yaml
  packages:
    '@my-company/*':
      access: $authenticated
      publish: $authenticated
    '@*/*':
      access: $authenticated
      publish: $authenticated
    '**':
      access: $authenticated
      publish: $authenticated
   ```

That way, **nobody will take advantage of your registry unless it's authorized and private packages won't be displayed in the User Interface**.

## Servidor

### Conexões Seguras

O uso de **HTTPS** é uma recomendação comum, por essa razão recomendamos a leitura da seção [SSL](ssl.md) para tornar o Verdaccio seguro ou usar um HTTPS [reverse proxy](reverse-proxy.md) no topo do Verdaccio.

### Validando Tokens

No `verdaccio@3.x` os tokens não têm data de validade. Por essa razão, introduzimos no próximo `verdaccio@4.x` o recurso JWT [PR#896] (https://github.com/verdaccio/verdaccio/pull/896)

```yaml
security:
  api:
    jwt:
      sign:
        expiresIn: 15d
        notBefore: 0
  web:
    sign:
      expiresIn: 7d
```

**O uso desta configuração substituirá o sistema atual e você poderá controlar por quanto tempo o token ficará ativo**.

O uso do JWT também melhora o desempenho com plug-ins de autenticação, o sistema antigo executará um desempacotamento e validará as credenciais em cada solicitação, enquanto o JWT dependerá da assinatura do token, evitando a sobrecarga do plug-in.

Como anotação, no **npmjs o token nunca expira **.