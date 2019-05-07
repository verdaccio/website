---
id: version-3.8.6-webui
title: Веб-интерфейс пользователя
original_id: webui
---

<p align="center"><img src="https://github.com/verdaccio/verdaccio/blob/master/assets/gif/verdaccio_big_30.gif?raw=true"></p>

У Verdaccio есть веб-интерфейс, чтобы отображать информацию о приватных пакетах, он настраиваемый.

```yaml
web:
  enable: true
  title: Verdaccio
  logo: logo.png
  scope:
```

Все ограничения, определенные в секции [Защита пакетов](protect-your-dependencies.md), будут действовать и для веб-интерфейса.

### Конфигурация

| Свойство | Тип     | Обязательное | Пример                         | Поддержка | Описание                                                                                                                                             |
| -------- | ------- | ------------ | ------------------------------ | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| enable   | boolean | Нет          | true/false                     | все       | включает/выключает веб-интерфейс                                                                                                                     |
| title    | string  | Нет          | Verdaccio                      | все       | Описание в HTML head title                                                                                                                           |
| logo     | string  | Нет          | http://my.logo.domain/logo.png | все       | a URI where logo is located                                                                                                                          |
| scope    | string  | Нет          | \\@myscope                   | все       | If you're using this registry for a specific module scope, specify that scope to set it in the webui instructions header (note: escape @ with \\@) |