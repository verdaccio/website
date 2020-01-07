---
id: version-4.4.1-logger
title: Logger
original_id: logger
---

Као и свака веб апликација, verdaccio поседује уграђени и прилагодиви logger. Можете дефинисати више типова излазних података.

<div id="codefund">''</div>

```yaml
logs:
  # console output
  - {type: stdout, format: pretty, level: http}
  # file output
  - {type: file, path: verdaccio.log, level: info}
  # Rotating log stream. Опције се прослеђују директно до bunyan. See: https://github.com/trentm/node-bunyan#stream-type-rotating-file
  - {type: rotating-file, format: json, path: /path/to/log.jsonl, level: http, options: {period: 1d}}
```

Користите `SIGUSR2` да обавестите апликацију, log-file је ротиран (rotated) и онда је потребно да се поново отвори. Напомена: Rotating log stream није подржан у кластер моду. [Прочитајте овде](https://github.com/trentm/node-bunyan#stream-type-rotating-file)

### Конфигурисање

| Својство | Тип    | Неопходно | Пример                                         | Подршка | Опис                                       |
| -------- | ------ | --------- | ---------------------------------------------- | ------- | ------------------------------------------ |
| type     | string | Не        | [stdout, file]                                 | all     | дефинише излаз                             |
| path     | string | Не        | verdaccio.log                                  | all     | ако је тип "фајл", дефинише локацију фајла |
| format   | string | Не        | [pretty, pretty-timestamped]                   | all     | излазни формат                             |
| level    | string | Не        | [fatal, error, warn, http, info, debug, trace] | all     | verbose level                              |
