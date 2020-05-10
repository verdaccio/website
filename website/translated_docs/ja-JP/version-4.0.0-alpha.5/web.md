---
id: version-4.0.0-alpha.5-webui
title: Webユーザインターフェース
original_id: webui
---

![Uplinks](https://user-images.githubusercontent.com/558752/52916111-fa4ba980-32db-11e9-8a64-f4e06eb920b3.png)

Verdaccioは、プライベートパッケージのみを表示するWebユーザーインターフェースを備えており、カスタマイズも可能です。

```yaml
web:
  enable: true
  title: Verdaccio
  logo: logo.png
  gravatar: true | false
  scope: @scope
  sort_packages: asc | desc
```

[パッケージを保護](protect-your-dependencies.md)するために定義されたすべてのアクセス制限は、Web インターフェイスにも適用されます。

### Configuration

| Property      | Type       | Required | Example                        | Support    | Description                                                                                                                                          |
| ------------- | ---------- | -------- | ------------------------------ | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| enable        | boolean    | No       | true/false                     | all        | allow to display the web interface                                                                                                                   |
| title         | string     | No       | Verdaccio                      | all        | HTML head title description                                                                                                                          |
| gravatar      | boolean    | No       | true                           | `>v4`   | Gravatars will be generated under the hood if this property is enabled                                                                               |
| sort_packages | [asc,desc] | No       | asc                            | `>v4`   | By default private packages are sorted by ascending                                                                                                  |
| logo          | string     | No       | http://my.logo.domain/logo.png | all        | a URI where logo is located (header logo)                                                                                                            |
| scope         | string     | No       | \\@myscope                   | `>v3.x` | If you're using this registry for a specific module scope, specify that scope to set it in the webui instructions header (note: escape @ with \\@) |

> It is recommended the logo size has the following size `40x40` pixels.