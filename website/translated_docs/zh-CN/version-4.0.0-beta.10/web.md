---
id: version-4.0.0-beta.10-webui
title: Web 用户界面
original_id: webui
---

![上行链路](https://user-images.githubusercontent.com/558752/52916111-fa4ba980-32db-11e9-8a64-f4e06eb920b3.png)

Verdaccio 有可定制的 Web 界面用于管理私有包

```yaml
web:
  enable: true
  title: Verdaccio
  logo: logo.png
  primary_color: "#4b5e40"
  gravatar: true | false
  scope: "@scope"
  sort_packages: asc | desc
```

所有访问限制设置可以参考 [保护包](protect-your-dependencies.md) 页面，这些规则也将应用于 Web 界面。

### 配置

| 属性            | 类型         | 必填 | 示例                                                            | 支持         | 描述                                                                     |
| ------------- | ---------- | -- | ------------------------------------------------------------- | ---------- | ---------------------------------------------------------------------- |
| enable        | boolean    | 否  | true/false                                                    | 任意路径       | 允许显示网页界面                                                               |
| title         | 字符串        | 否  | Verdaccio                                                     | 任意路径       | HTML 页眉标题说明                                                            |
| gravatar      | boolean    | 否  | true                                                          | `>v4`   | Gravatars will be generated under the hood if this property is enabled |
| sort_packages | [asc,desc] | 否  | asc                                                           | `>v4`   | 默认情况下，私有包按升序排序                                                         |
| logo          | 字符串        | 否  | `/local/path/to/my/logo.png` `http://my.logo.domain/logo.png` | 任意路径       | logo 所在的 URI 路径（顶部 logo）                                               |
| primary_color | 字符串        | 否  | "#4b5e40"                                                     | `>4`    | The primary color to use throughout the UI (header, etc)               |
| scope         | 字符串        | 否  | \\@myscope                                                  | `>v3.x` | 如果要为特定模块作用域使用此registry，请指定该作用域，在webui指南页眉内设置它（注释：escape @ with \\@)  |

> 建议 logo 尺寸为 `40x40` 像素。