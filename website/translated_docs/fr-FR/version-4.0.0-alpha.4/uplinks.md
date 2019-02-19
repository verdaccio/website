---
id: version-4.0.0-alpha.4-uplinks
title: Uplinks
original_id: uplinks
---
Un *uplink* est un lien avec un registre externe qui donne accès à des paquets externes.

![Uplinks](https://user-images.githubusercontent.com/558752/52976233-fb0e3980-33c8-11e9-8eea-5415e6018144.png)

### Utilisation

```yaml
uplinks:
  npmjs:
   url: https://registry.npmjs.org/
  server2:
    url: http://mirror.local.net/
    timeout: 100ms
  server3:
    url: http://mirror2.local.net:9000/
  baduplink:
    url: http://localhost:55666/
```

### Configuration

You can define mutiple uplinks and each of them must have an unique name (key). They can have two properties:

| Propriété    | Type      | Obligatoire | Exemple                                     | Soutien | Description                                                                                                                          | Par défaut     |
| ------------ | --------- | ----------- | ------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------ | -------------- |
| url          | chaîne    | Oui         | https://registry.npmjs.org/                 | tous    | L’url du registre                                                                                                                    | npmjs          |
| ca           | chaîne    | Non         | ~./ssl/client.crt'                          | tous    | Certificat de chemin SSL                                                                                                             | Pas par défaut |
| timeout      | chaîne    | Non         | 100ms                                       | tous    | définir le nouveau délai d’attente pour la demande                                                                                   | 30s            |
| maxage       | chaîne    | Non         | 10m                                         | tous    | limite maximale d'échecs à chaque demande                                                                                            | 2m             |
| fail_timeout | chaîne    | Non         | 10m                                         | tous    | définit le temps maximal pour qu'une demande devienne un échec                                                                       | 5m             |
| max_fails    | numéro    | Non         | 2                                           | tous    | limite maximale d'échecs à chaque demande                                                                                            | 2              |
| cache        | booléenne | Non         | [vrai,faux]                                 | >= 2.1  | mettre en cache tous les tarballs éloignés dans l'archive                                                                            | vrai           |
| auth         | liste     | Non         | [voir ci-dessous](uplinks.md#auth-property) | >= 2.5  | attribuer l'en-tête "Autorisation" [plus d'informations](http://blog.npmjs.org/post/118393368555/deploying-with-npm-private-modules) | désactivé      |
| en-têtes     | liste     | Non         | autorisation: "Bearer SecretJWToken=="      | tous    | liste des en-têtes personnalisés pour l'uplink                                                                                       | désactivé      |
| strict_ssl   | booléenne | Non         | [vrai,faux]                                 | >= 3.0  | Si vrai, nécessite que les certificats SSL soient valides.                                                                           | vrai           |

#### Propriété de l'auth

The `auth` property allows you to use an auth token with an uplink. Using the default environment variable:

```yaml
uplinks:
  private:
    url: https://private-registry.domain.com/registry
    auth:
      type: bearer
      token_env: true # defaults to `process.env['NPM_TOKEN']`
```

ou par une variable environnementale spécifique:

```yaml
uplinks:
  private:
    url: https://private-registry.domain.com/registry
    auth:
      type: bearer
      token_env: FOO_TOKEN
```

`token_env: FOO_TOKEN` utilisera en interne `process.env['FOO_TOKEN']`

ou en spécifiant directement un jeton:

```yaml
uplinks:
  private:
    url: https://private-registry.domain.com/registry
    auth:
      type: bearer
      token: "token"
```

> Remarque: `jeton` a la priorité sur `jeton_env`

### Vous devez savoir

* Uplinks must be registries compatible with the `npm` endpoints. Eg: *verdaccio*, `sinopia@1.4.0`, *npmjs registry*, *yarn registry*, *JFrog*, *Nexus* and more.
* Setting `cache` to false will help to save space in your hard drive. This will avoid store `tarballs` but [it will keep metadata in folders](https://github.com/verdaccio/verdaccio/issues/391).
* Exceed with multiple uplinks might slow down the lookup of your packages due for each request a npm client does, verdaccio does 1 call for each uplink.
* The (timeout, maxage and fail_timeout) format follow the [NGINX measurement units](http://nginx.org/en/docs/syntax.html)