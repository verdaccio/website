---
id: awọn ifitonileti
title: "Awọn ifitonileti"
---

Fifitonileti jẹ gbigbedide ni pataki lati jẹ lilo pẹlu awọn webhooks Slack ti n wọle bọ, ṣugbọn o tun ma ṣe ifijiṣẹ fi ifiranṣẹ to rọrun kan si eyikeyi opin. Lọwọlọwọ o n ṣiṣẹ fun aṣẹ `npm publish` nikan.

## Ilo

Apẹẹrẹ kan pẹlu ikọ **HipChat**, **Stride** ati **Google Hangouts Chat**:

> Verdaccio n ṣe atilẹyin eyikeyi API, ma se siyemeji lati ṣafikun apẹẹrẹ diẹ sii.

#### Ifitonileti kan

```yaml
notify:
  method: POST
  headers: [{'Content-Type': 'application/json'}]
  endpoint: https://usagge.hipchat.com/v2/room/3729485/notification?auth_token=mySecretToken
  content: '{"color":"green","message":"New package published: * {{ name }}*","notify":true,"message_format":"text"}'
```

#### Ifitonileti pupọ

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

## Awoṣe

A lo [Handlebars](https://handlebarsjs.com/) gẹgẹbi ẹrọ ti koko awoṣe.

### Awọn apẹẹrẹ Ọna

    # iterate all versions
    {{ name }}{{#each versions}} v{{version}}{{/each}}
    
    # publisher and `dist-tag` package published
    {{ publisher.name }} has published {{ publishedPackage }}
    

### Awọn ohun ini

Akojọ ti awọn ohun ini to ṣe wọle si nipasẹ awoṣe

* Mẹtadata
* Olugbejade (ẹniti o n ṣe agbejade)
* Akopọ to jẹ Gbigbejade (akopọ@1.0.0)

### Mẹtadata

Mẹtadata akopọ ti awoṣe naa ni iwọle si

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
    

### Olugbejade

You can access to the package publisher information in the `content` of a webhook using the `publisher` object.

See below the `publisher` object type:

    {
      name: string,
      groups: string[],
      real_groups: string[]
    }
    

An example:

    notify:
      method: POST
      headers: [{'Content-Type': 'application/json'}]
      endpoint: https://usagge.hipchat.com/v2/room/3729485/notification?auth_token=mySecretToken
      content: '{"color":"green","message":"New package published: * {{ name }}*. Publisher name: * {{ publisher.name }} *.","notify":true,"message_format":"text"}'
    

**Note:** it's not possible to get the publisher information if the `package.json` file already has the `publisher` property.

### Package Published

You can access to the package is being published with the keyword `{{publishedPackage}}` as follows.

    {{ publisher.name }} has published {{ publishedPackage }}
    

## Configuration

| Ohun ini            | Iru          | Ti o nilo | Atilẹyin | Atilẹwa | Apejuwe                                                                                      |
| ------------------- | ------------ | --------- | -------- | ------- | -------------------------------------------------------------------------------------------- |
| method              | okun         | Rara      | gbogbo   |         | HTTP verb                                                                                    |
| packagePattern      | okun         | Rara      | gbogbo   |         | Only run this notification if the package name matches the regular expression                |
| packagePatternFlags | okun         | Rara      | gbogbo   |         | Any flags to be used with the regular expression                                             |
| headers             | array/object | Bẹẹni     | gbogbo   |         | If this endpoint requires specific headers, set them here as an array of key: value objects. |
| endpoint            | okun         | Bẹẹni     | gbogbo   |         | set the URL endpoint for this call                                                           |
| content             | okun         | Bẹẹni     | gbogbo   |         | any [Handlebar](https://handlebarsjs.com/) expressions                                       |