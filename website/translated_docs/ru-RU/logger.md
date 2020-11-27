---
id: logger
title: "Логи"
---

As with any web application, Verdaccio has a customisable built-in logger. You can define multiple types of outputs.

```yaml
logs:
  # console output
  - {type: stdout, format: pretty, level: http}
  # file output
  - {type: file, path: verdaccio.log, level: info}
  # Rotating log stream. Options are passed directly to bunyan. See: https://github.com/trentm/node-bunyan#stream-type-rotating-file
  - {type: rotating-file, format: json, path: /path/to/log.jsonl, level: http, options: {period: 1d}}
```

Используйте `SIGUSR2` tдля того, чтобы уведомить приложение, что лог-файл был ротирован и его надо переоткрыть. Примечание: Ротация логов не поддерживается в кластерном режиме. [Смотрите здесь](https://github.com/trentm/node-bunyan#stream-type-rotating-file)

### Конфигурация

| Свойство | Тип    | Обязательное | Пример                                         | Поддержка | Описание                                            |
| -------- | ------ | ------------ | ---------------------------------------------- | --------- | --------------------------------------------------- |
| type     | string | Нет          | [stdout, file]                                 | все       | определяет устройство вывода                        |
| path     | string | Нет          | verdaccio.log                                  | все       | если type - это файл, то местоположение этого файла |
| format   | string | Нет          | [pretty, pretty-timestamped]                   | все       | форматирование выходных данных                      |
| level    | string | Нет          | [fatal, error, warn, http, info, debug, trace] | все       | уровень подробности логов                           |