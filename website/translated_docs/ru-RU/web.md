---
id: webui
title: "Веб-интерфейс пользователя"
---

![Uplinks](https://user-images.githubusercontent.com/558752/52916111-fa4ba980-32db-11e9-8a64-f4e06eb920b3.png)

У Verdaccio есть веб-интерфейс, чтобы отображать информацию о приватных пакетах, он настраиваемый.

```yaml
web:
  enable: true
  title: Verdaccio
  logo: logo.png
  primary_color: "#4b5e40"
  gravatar: true | false
  scope: \@scope
  sort_packages: asc | desc
```

Все ограничения, определенные в секции [Защита пакетов](protect-your-dependencies.md), будут действовать и для веб-интерфейса.

### Configuration

| Свойство      | Тип        | Обязательное | Пример                                                      | Поддержка  | Описание                                                                                                                                             |
| ------------- | ---------- | ------------ | ----------------------------------------------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| enable        | boolean    | Нет          | true/false                                                  | все        | включает/выключает веб-интерфейс                                                                                                                     |
| title         | string     | Нет          | Verdaccio                                                   | все        | Описание в HTML head title                                                                                                                           |
| gravatar      | boolean    | Нет          | true                                                        | `>v4`   | Пользовательские gravatar'ы будут/не будут генерироваться                                                                                            |
| sort_packages | [asc,desc] | Нет          | asc                                                         | `>v4`   | По умолчанию, приватные пакеты сортируются в прямом алфавитном порядке                                                                               |
| logo          | string     | Нет          | /local/path/to/my/logo.png  
http://my.logo.domain/logo.png | все        | URI логотипа (в шапке)                                                                                                                               |
| primary_color | string     | Нет          | "#4b5e40"                                                   | `>4`    | The primary color to use throughout the UI (header, etc)                                                                                             |
| scope         | string     | Нет          | \\@myscope                                                | `>v3.x` | If you're using this registry for a specific module scope, specify that scope to set it in the webui instructions header (note: escape @ with \\@) |

> It is recommended the logo size has the following size `40x40` pixels.