---
id: version-4.0.0-alpha.4-notifications
title: Notifications
original_id: notifications
---
Notify was built primarily to use with Slack's Incoming webhooks, but will also deliver a simple payload to any endpoint. Currently only active for `npm publish` command.

## Utilisation

Un exemple avec **HipChat**, **Stride** et **Google Hangouts Chat**, cliquez sur:

> Verdaccio supporte chaque API, n'hésitez pas à ajouter d'autres exemples.

#### Notification unique

```yaml
notify:
  method: POST
  headers: [{'Content-Type': 'application/json'}]
  endpoint: https://usagge.hipchat.com/v2/room/3729485/notification?auth_token=mySecretToken
  content: '{"color":"green","message":"New package published: * {{ name }}*","notify":true,"message_format":"text"}'
```

#### Notification multiple

```yaml
notify:
  'example-google-chat':
    method: POST
    headers: [{'Content-Type': 'application/json'}]
    endpoint: https://chat.googleapis.com/v1/spaces/AAAAB_TcJYs/messages?key=myKey&token=myToken
    content: '{"text":"New package published: `{{ name }}{{#each versions}} v{{version}}{{/each}}`"}'
  'example-hipchat':
     method: POST
     headers: [{'Content-Type': 'application/json'}]
     endpoint: https://usagge.hipchat.com/v2/room/3729485/notification?auth_token=mySecretToken
     content: '{"color":"green","message":"New package published: * {{ name }}*","notify":true,"message_format":"text"}'
  'example-stride':
     method: POST
     headers: [{'Content-Type': 'application/json'}, {'authorization': 'Bearer secretToken'}]
     endpoint: https://api.atlassian.com/site/{cloudId}/conversation/{conversationId}/message
     content: '{"body": {"version": 1,"type": "doc","content": [{"type": "paragraph","content": [{"type": "text","text": "New package published: * {{ name }}* Publisher name: * {{ publisher.name }}"}]}]}}'     
```

## Modèle

Nous utilisons [Handlebars](https://handlebarsjs.com/) comme moteur de gabarit principal.

### Exemples de format

    # iterate all versions
    {{ name }}{{#each versions}} v{{version}}{{/each}}
    
    # publisher and `dist-tag` package published
    {{ publisher.name }} has published {{ publishedPackage }}
    

### Propriétés

Liste des propriétés accessibles via un modèle

* Métadonnées
* Éditeur (celui qui publie)
* Package publié (package@1.0.0)

### Métadonnées

Package de métadonnées auquel le modèle a accès

    {
        "_id": "@test/pkg1",
        "name": "@test/pkg1",
        "description": "",
        "dist-tags": {
            "beta": "1.0.54"
        },
        "versions": {
            "1.0.54": {
                "name": "@test/pkg1",
                "version": "1.0.54",
                "description": "some description",
                "main": "index.js",
                "scripts": {
                    "test": "echo \"Error: no test specified\" && exit 1"
                },
                "keywords": [],
                "author": {
                    "name": "Author Name",
                    "email": "author@domain.com"
                },
                "license": "MIT",
                "dependencies": {
                    "webpack": "4.12.0"
                },
                "readmeFilename": "README.md",
                "_id": "@ test/pkg1@1.0.54",
                "_npmVersion": "6.1.0",
                "_nodeVersion": "9.9.0",
                "_npmUser": {},
                "dist": {
                    "integrity": "sha512-JlXWpLtMUBAqvVZBvH7UVLhXkGE1ctmXbDjbH/l0zMuG7wVzQ7GshTYvD/b5C+G2vOL2oiIS1RtayA/kKkTwKw==",
                    "shasum": "29c55c52c1e76e966e706165e5b9f22e32aa9f22",
                    "tarball": "http://localhost:4873/@test/pkg1/-/@test/pkg1-1.0.54.tgz"
                }
            }
        },
        "readme": "# test",
        "_attachments": {
            "@test/pkg1-1.0.54.tgz": {
                "content_type": "application/octet-stream",
                "data": "H4sIAAAAAAAAE+y9Z5PjyJIgOJ ...",
                "length": 33112
            }
        },
        "time": {}
    }
    

### Editeur

Vous pouvez accéder aux informations sur les packages de l'éditeur dans le `content` d'un Webhook à l'aide de l'objet `publisher`.

Voir le type d'objet `publisher` ci-dessous:

    {
      name: string,
      groups: string[],
      real_groups: string[]
    }
    

Un exemple:

    notify:
      method: POST
      headers: [{'Content-Type': 'application/json'}]
      endpoint: https://usagge.hipchat.com/v2/room/3729485/notification?auth_token=mySecretToken
      content: '{"color":"green","message":"New package published: * {{ name }}*. Publisher name: * {{ publisher.name }} *.","notify":true,"message_format":"text"}'
    

**Remarque:** Il est impossible d'obtenir des informations sur l'éditeur si le fichier `package.json` possède déjà la propriété `éditeur`.

### Package Publié

You can access to the package is being published with the keyword `{{publishedPackage}}` as follows.

    {{ publisher.name }} has published {{ publishedPackage }}
    

## Configuration

| Propriété           | Type          | Obligatoire | Soutien | Par défaut | Description                                                                                                          |
| ------------------- | ------------- | ----------- | ------- | ---------- | -------------------------------------------------------------------------------------------------------------------- |
| méthode             | chaîne        | Non         | tous    |            | HTTP verb                                                                                                            |
| packagePattern      | chaîne        | Non         | tous    |            | N'effectuez cette notification que si le nom du package correspond à l'expression régulière                          |
| packagePatternFlags | chaîne        | Non         | tous    |            | Tous les drapeaux à utiliser avec l'expression régulière                                                             |
| en-têtes            | tableau/objet | Oui         | tous    |            | Si ce noeud final nécessite des en-têtes spécifiques, définissez-les ici comme un tableau de clé: valeur des objets. |
| endpoint            | chaîne        | Oui         | tous    |            | définir l'URL de l'endpoint pour cet appel                                                                           |
| content             | chaîne        | Oui         | tous    |            | toute expression [Handlebar](https://handlebarsjs.com/)                                                              |