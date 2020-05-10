---
id: version-3.8.6-webui
title: Webユーザインターフェース
original_id: webui
---

<p align="center"><img src="https://github.com/verdaccio/verdaccio/blob/master/assets/gif/verdaccio_big_30.gif?raw=true"></p>

Verdaccioは、プライベートパッケージのみを表示するWebユーザーインターフェースを備えており、カスタマイズも可能です。

```yaml
web:
  enable: true
  title: Verdaccio
  logo: logo.png
  scope:
```

[パッケージを保護](protect-your-dependencies.md)するために定義されたすべてのアクセス制限は、Web インターフェイスにも適用されます。

### Configuration

| Property | Type    | Required | Example                        | Support | Description                                                                                                                                          |
| -------- | ------- | -------- | ------------------------------ | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| enable   | boolean | No       | true/false                     | all     | allow to display the web interface                                                                                                                   |
| title    | string  | No       | Verdaccio                      | all     | HTML head title description                                                                                                                          |
| logo     | string  | No       | http://my.logo.domain/logo.png | all     | a URI where logo is located                                                                                                                          |
| scope    | string  | No       | \\@myscope                   | all     | If you're using this registry for a specific module scope, specify that scope to set it in the webui instructions header (note: escape @ with \\@) |