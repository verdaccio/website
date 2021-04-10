---
id: webui
title: "Web 用户界面"
---

![上行链路](https://user-images.githubusercontent.com/558752/52916111-fa4ba980-32db-11e9-8a64-f4e06eb920b3.png)

Verdaccio has a web user interface to display only the private packages and can be customised to your liking.

```yaml
web:
  enable: true
  title: Verdaccio
  logo: http://somedomain/somelogo.png
  primary_color: "#4b5e40"
  gravatar: true | false
  scope: "@scope"
  sort_packages: asc | desc
  darkMode: false
  favicon: http://somedomain/favicon.ico | /path/favicon.ico
```

所有访问限制设置可以参考 [保护包](protect-your-dependencies.md) 页面，这些规则也将应用于 Web 界面。

> The `primary_color` and `scope` must be wrapped by quotes: eg: ('#000000' or "#000000")

The `primary_color` **must be a valid hex representation**.

### Internationalization

*Since v4.5.0*, there are translations available.

```yaml
i18n:
  web: en-US
```

> ⚠️ Only the languages in this [list](https://github.com/verdaccio/ui/tree/master/i18n/translations) are available, feel free to contribute with more. The default one is en-US

### 配置

| 属性            | 类型         | 必填 | 示例                                                            | 支持            | 描述                                                                                                                       |
| ------------- | ---------- | -- | ------------------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------ |
| enable        | boolean    | No | true/false                                                    | all           | 允许显示网页界面                                                                                                                 |
| title         | string     | No | Verdaccio                                                     | all           | HTML 页眉标题说明                                                                                                              |
| gravatar      | boolean    | No | true                                                          | `>v4`      | Gravatars will be generated under the hood if this property is enabled                                                   |
| sort_packages | [asc,desc] | No | asc                                                           | `>v4`      | 默认情况下，私有包按升序排序                                                                                                           |
| logo          | 字符串        | 否  | `/local/path/to/my/logo.png` `http://my.logo.domain/logo.png` | 任意路径          | logo 所在的 URI 路径（顶部 logo）                                                                                                 |
| primary_color | 字符串        | 否  | "#4b5e40"                                                     | `>4`       | The primary color to use throughout the UI (header, etc)                                                                 |
| scope         | 字符串        | 否  | @myscope                                                      | `>v3.x`    | If you're using this registry for a specific module scope, specify that scope to set it in the webui instructions header |
| darkMode      | boolean    | 否  | false                                                         | `>=v4.6.0` | This mode is an special theme for those want to live in the dark side                                                    |
| favicon       | 字符串        | 否  | false                                                         | `>=v5.0.1` | Display a custom favicon, can be local resource or valid url                                                             |

> The recommended logo size is `40x40` pixels.
> 
> The `darkMode` can be enabled via UI and is persisted in the browser local storage. Furthermore, also void `primary_color` and dark cannot be customized.