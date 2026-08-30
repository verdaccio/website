---
id: notifications
title: 'Notifications'
---

Notify was built primarily to use with Slack's Incoming
webhooks, but will also deliver a simple payload to
any endpoint. This is currently only active for the `npm publish`
command.

## Usage {#usage}

An example with a **HipChat**, **Stride** and **Google Hangouts Chat** hook:

> Verdaccio supports any API, feel free to add more examples.

#### Single notification {#single-notification}

```yaml
notify:
  method: POST
  headers: [{ 'Content-Type': 'application/json' }]
  endpoint: https://usagge.hipchat.com/v2/room/3729485/notification?auth_token=mySecretToken
  content: '{"color":"green","message":"New package published: * {{ name }}*","notify":true,"message_format":"text"}'
```

#### Multiple notification {#multiple-notification}

```yaml
notify:
  'example-google-chat':
    method: POST
    headers: [{ 'Content-Type': 'application/json' }]
    endpoint: https://chat.googleapis.com/v1/spaces/AAAAB_TcJYs/messages?key=myKey&token=myToken
    content: '{"text":"New package published: `{{ name }}{{#each versions}} v{{version}}{{/each}}`"}'
  'example-hipchat':
    method: POST
    headers: [{ 'Content-Type': 'application/json' }]
    endpoint: https://usagge.hipchat.com/v2/room/3729485/notification?auth_token=mySecretToken
    content: '{"color":"green","message":"New package published: * {{ name }}*","notify":true,"message_format":"text"}'
  'example-stride':
    method: POST
    headers: [{ 'Content-Type': 'application/json' }, { 'authorization': 'Bearer secretToken' }]
    endpoint: https://api.atlassian.com/site/{cloudId}/conversation/{conversationId}/message
    content: '{"body": {"version": 1,"type": "doc","content": [{"type": "paragraph","content": [{"type": "text","text": "New package published: * {{ name }}* Publisher name: * {{ publisher.name }}"}]}]}}'
```

## Template {#template}

We use [Handlebars](https://handlebarsjs.com/) as main template engine.

### Format Examples {#format-examples}

```
# iterate all versions
{{ name }}{{#each versions}} v{{version}}{{/each}}

# publisher and `dist-tag` package published
{{ publisher.name }} has published {{ publishedPackage }}
```

### Properties {#properties}

List of properties accesible via template:

- Metadata
- Publisher (who is publishing)
- Package Published (package@1.0.0)
- Publish Type (what happened)

### Metadata {#metadata}

Package metadata that the template has access

```
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
```

### Publisher {#publisher}

You can get access to the package publisher information in the `content` of a webhook using the `publisher` object.

See below the `publisher` object type:

```
{
  name: string,
  groups: string[],
  real_groups: string[]
}
```

An example:

```
notify:
  method: POST
  headers: [{'Content-Type': 'application/json'}]
  endpoint: https://usagge.hipchat.com/v2/room/3729485/notification?auth_token=mySecretToken
  content: '{"color":"green","message":"New package published: * {{ name }}*. Publisher name: * {{ publisher.name }} *.","notify":true,"message_format":"text"}'
```

**Note:** it's not possible to get the publisher information if the `package.json` file already has the `publisher` property.

### Package Published {#package-published}

You can access to the package is being published with the keyword `{{publishedPackage}}` as follows.

```
{{ publisher.name }} has published {{ publishedPackage }}
```

### Publish Type {#publish-type}

`{{publishType}}` tells you which event fired the notification:

| Value       | What happened                                            |
| ----------- | -------------------------------------------------------- |
| `publish`   | a version became installable                             |
| `unpublish` | a version or a whole package was removed                 |
| `stage`     | a version was submitted for review (`npm stage publish`) |
| `unstage`   | a staged version was discarded (`npm stage reject`)      |

`stage` and `unstage` only ever fire when [staged publishing](staged-publishing)
is enabled, and neither changes what is installable. Approving a staged version
reports `publish`, because that is exactly what it does — a webhook listening for
publishes still sees it.

Include it in the payload so the receiving end can route on it:

```yaml
notify:
  method: POST
  endpoint: https://hooks.example.org/registry
  content: '{"type":"{{ publishType }}","package":"{{ publishedPackage }}","by":"{{ publisher.name }}"}'
```

:::note
Templates are plain [Handlebars](https://handlebarsjs.com/) with no extra helpers
registered, so there is no way to compare `publishType` against a string inside
the template. Send every event and filter where you receive it.
:::

## Configuration {#configuration}

| Property            | Type         | Required | Support        | Default | Description                                                                                  |
| ------------------- | ------------ | -------- | -------------- | ------- | -------------------------------------------------------------------------------------------- |
| method              | string       | No       | POST, PUT, GET |         | HTTP verb (POST, PUT, GET)                                                                   |
| packagePattern      | string       | No       | all            |         | Only run this notification if the package name matches the regular expression                |
| packagePatternFlags | string       | No       | all            |         | Any flags to be used with the regular expression                                             |
| headers             | array/object | Yes      | all            |         | If this endpoint requires specific headers, set them here as an array of key: value objects. |
| endpoint            | string       | Yes      | all            |         | set the URL endpoint for this call                                                           |
| content             | string       | Yes      | all            |         | any [Handlebar](https://handlebarsjs.com/) expressions                                       |
