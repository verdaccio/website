---
id: version-4.4.1-best
title: Boas Práticas
original_id: Melhores
---

O guia a seguir é uma lista das melhores práticas coletadas e que geralmente recomendamos a todos os usuários. Não leve este guia como obrigatório, você pode escolher algumas delas de acordo com suas necessidades.

<div id="codefund">''</div>

**Feel free to suggest your best practices with the Verdaccio community**.

## Registro Privado

You can add users and manage which users can access which packages.

É recomendado que você defina um prefixo para os seus pacotes privados, por exemplo `local-*` ou `@my-company/*`, assim todos os seus elementos privados ficarão assim: `local-foo`. This way you can clearly separate public packages from private ones.

 ```yaml
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
   ```

Always remember, **the order of packages access is important**, packages are mached always top to bottom.

### Using public packages from npmjs.org

If some package doesn't exist in the storage, server will try to fetch it from npmjs.org. If npmjs.org is down, it serves packages from cache pretending that no other packages exist. **Verdaccio will download only what's needed (= requested by clients)**, and this information will be cached, so if client will ask the same thing second time, it can be served without asking npmjs.org for it.

**Exemplo:**

Se você solicitar `express@4.0.1` a partir deste servidor uma vez com êxito, você poderá faze-lo novamente (com todas as suas dependências) a qualquer momento, mesmo que o npmjs.org esteja inativo. Entretanto `express@4.0.0` não será baixado até que seja realmente necessário para alguém. E se o npmjs.org estiver offline, este servidor dirá que somente o `express@4.0.1` (= somente o que está no cache) é publicado, mas nada mais.

### Override public packages

If you want to use a modified version of some public package `foo`, you can just publish it to your local server, so when your type `npm install foo`, **it'll consider installing your version**.

There's two options here:

1. You want to create a separate **fork** and stop synchronizing with public version.

   If you want to do that, you should modify your configuration file so verdaccio won't make requests regarding this package to npmjs anymore. Inclua uma entrada separada para este pacote no `config.yaml` e remova a lista `npmjs` do `proxy` e reinicie o servidor.

   ```yaml
    packages:
      '@my-company/*':
        access: $all
        publish: $authenticated
        # comment it out or leave it empty
        # proxy:
   ```

   When you publish your package locally, **you should probably start with version string higher than existing one**, so it won't conflict with existing package in the cache.

2. You want to temporarily use your version, but return to public one as soon as it's updated.

   In order to avoid version conflicts, **you should use a custom pre-release suffix of the next patch version**. Por exemplo, se um pacote público tiver a versão 0.1.2, você poderá fazer upload de `0.1.3-my-temp-fix`.

   ```bash
    npm version 0.1.3-my-temp-fix
    npm --publish --tag fix --registry http://localhost:4873
   ```

   Desta forma, o seu pacote será usado até que seu mantenedor original atualize seu pacote público para `0.1.3`.




## Segurança

The security starts in your environment, for such thing we totally recommend read **[10 npm Security Best Practices](https://snyk.io/blog/ten-npm-security-best-practices/)** and follow the recommendation.

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

In that way, **nobody will take advance of your registry unless is authorized and private packages won't be displayed in the User Interface**.

## Server

### Secured Connections

Using **HTTPS** is a common recomendation, for such reason we recommend read the [SSL](ssl.md) section to make Verdaccio secure or using a HTTPS [reverse proxy](reverse-proxy.md) on top of Verdaccio.

### Expiring Tokens

In `verdaccio@3.x` the tokens have no expiration date. For such reason we introduced in the next `verdaccio@4.x` the JWT feature [PR#896](https://github.com/verdaccio/verdaccio/pull/896)

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

**Using this configuration will override the current system and you will be able to control how long the token will live**.

O uso do JWT também melhora o desempenho com plug-ins de autenticação, o sistema antigo executará um desempacotamento e validará as credenciais em cada solicitação, enquanto o JWT dependerá da assinatura do token, evitando a sobrecarga do plug-in.

As a side note, at **npmjs the token never expires**.
