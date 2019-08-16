---
id: version-3.8.6-logger
title: Logger
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

| Property | Type   | Required | Beispiel                                       | Support | Beschreibung                                      |
| -------- | ------ | -------- | ---------------------------------------------- | ------- | ------------------------------------------------- |
| type     | string | Nein     | [stdout, file]                                 | all     | define the output                                 |
| path     | string | Nein     | verdaccio.log                                  | all     | if type is file, define the location of that file |
| format   | string | Nein     | [pretty, pretty-timestamped]                   | all     | output format                                     |
| level    | string | Nein     | [fatal, error, warn, http, info, debug, trace] | all     | verbose level                                     |