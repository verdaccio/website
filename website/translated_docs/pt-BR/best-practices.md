---
id: best
title: "Melhores Práticas"
---

O guia a seguir é uma lista das melhores práticas coletadas e que geralmente recomendamos a todos os usuários. Não leve este guia como obrigatório, você pode escolher algumas delas de acordo com suas necessidades.

**Sinta-se à vontade para sugerir suas melhores práticas com a comunidade Verdaccio**.

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

Lembre-se sempre de que **a ordem de acesso aos pacotes é importante**, os pacotes são processados sempre de cima para baixo.

### Using public packages from npmjs.org

If some package doesn't exist in the storage, server will try to fetch it from npmjs.org. If npmjs.org is down, it serves packages from cache pretending that no other packages exist. **O Verdaccio fará o download apenas do que é necessário (= solicitado pelos clientes)**, e essa informação será armazenada em cache, portanto, se o cliente requisitar a mesma coisa pela segunda vez, ela poderá ser exibida sem solicitar o npmjs.org.

**Exemplo:**

Se você solicitar `express@4.0.1` a partir deste servidor uma vez com êxito, você poderá faze-lo novamente (com todas as suas dependências) a qualquer momento, mesmo que o npmjs.org esteja inativo. Entretanto `express@4.0.0` não será baixado até que seja realmente necessário para alguém. E se o npmjs.org estiver offline, este servidor dirá que somente o `express@4.0.1` (= somente o que está no cache) é publicado, mas nada mais.

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

## Security

A segurança começa no seu ambiente, por isso recomendamos que leia **[10 npm Security Best Practices](https://snyk.io/blog/ten-npm-security-best-practices/)** e siga a recomendação.

### Permissões dos Pacotes

By default all packages are you publish in Verdaccio are accessible for all public, we totally recommend protect your registry from external non authorized users updating `access` property to `$authenticated`.

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

Using JWT also improves the performance with authentication plugins, the old system will perform an unpackage and validating the credentials in each request, while JWT will rely on the token signature avoiding the overhead for the plugin.

As a side note, at **npmjs the token never expires**.