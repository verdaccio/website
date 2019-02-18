---
id: webui
title: "Web User Interface"
---


<p align="center"><img src="https://user-images.githubusercontent.com/558752/52916111-fa4ba980-32db-11e9-8a64-f4e06eb920b3.png"></p>

Verdaccio has a web user interface to display only the private packages and can be customisable.

```yaml
web:
  enable: true
  title: Verdaccio
  logo: logo.png
  gravatar: true | false
  scope: @scope
```

All access restrictions defined to [protect your packages](protect-your-dependencies.md) will also apply to the Web Interface.

### Cấu hình

| Thuộc tính | Phương thức | Yêu cầu | Ví dụ                          | Hỗ trợ | Miêu tả                                                                                                                                              |
| ---------- | ----------- | ------- | ------------------------------ | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| enable     | boolean     | Không   | true/false                     | tất cả | allow to display the web interface                                                                                                                   |
| title      | chuỗi       | Không   | Verdaccio                      | tất cả | HTML head title description                                                                                                                          |
| gravatar   | boolean     | Không   | true                           | tất cả | Gravatars will be generated under the hood if this property is enabled                                                                               |
| logo       | chuỗi       | Không   | http://my.logo.domain/logo.png | tất cả | a URI where logo is located                                                                                                                          |
| scope      | chuỗi       | Không   | \\@myscope                   | tất cả | If you're using this registry for a specific module scope, specify that scope to set it in the webui instructions header (note: escape @ with \\@) |