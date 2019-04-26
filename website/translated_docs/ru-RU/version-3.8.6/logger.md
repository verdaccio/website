---
id: version-3.8.6-logger
title: Логи
original_id: logger
---

As any web application, verdaccio has a customisable built-in logger. You can define multiple types of outputs.

```yaml
logs:
  # console output
  - {type: stdout, format: pretty, level: http}
  # file output
  - {type: file, path: verdaccio.log, level: info}
  # Rotating log stream. Options are passed directly to bunyan. See: https://github.com/trentm/node-bunyan#stream-type-rotating-file
  - {type: rotating-file, format: json, path: /path/to/log.jsonl, level: http, options: {period: 1d}}
```

Use `SIGUSR2` to notify the application, the log-file was rotated and it needs to reopen it. Note: Rotating log stream is not supported in cluster mode. [See here](https://github.com/trentm/node-bunyan#stream-type-rotating-file)

### Configuration

| Свойство | Тип    | Обязательное | Пример                                         | Поддержка | Описание                                          |
| -------- | ------ | ------------ | ---------------------------------------------- | --------- | ------------------------------------------------- |
| type     | string | Нет          | [stdout, file]                                 | все       | define the output                                 |
| path     | string | Нет          | verdaccio.log                                  | все       | if type is file, define the location of that file |
| format   | string | Нет          | [pretty, pretty-timestamped]                   | все       | output format                                     |
| level    | string | Нет          | [fatal, error, warn, http, info, debug, trace] | все       | verbose level                                     |