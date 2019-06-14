---
id: version-3.8.6-logger
title: Olugbasilẹ
original_id: olugbasilẹ
---

As any web application, verdaccio has a customisable built-in logger. You can define multiple types of outputs.

```yaml
logs:
  # console output
  - {type: stdout, format: pretty, level: http}
  # file output
  - {type: file, path: verdaccio.log, level: info}
  # Rotating log stream. Awọn aṣayan n jẹ fifransẹ ni taara si bunyan. See: https://github.com/trentm/node-bunyan#stream-type-rotating-file
  - {type: rotating-file, format: json, path: /path/to/log.jsonl, level: http, options: {period: 1d}}
```

Use `SIGUSR2` to notify the application, the log-file was rotated and it needs to reopen it. Note: Rotating log stream is not supported in cluster mode. [See here](https://github.com/trentm/node-bunyan#stream-type-rotating-file)

### Configuration

| Ohun ini | Iru  | Ti o nilo | Apẹẹrẹ                                         | Atilẹyin | Apejuwe                                           |
| -------- | ---- | --------- | ---------------------------------------------- | -------- | ------------------------------------------------- |
| type     | okun | Rara      | [stdout, file]                                 | gbogbo   | define the output                                 |
| path     | okun | Rara      | verdaccio.log                                  | gbogbo   | if type is file, define the location of that file |
| format   | okun | Rara      | [pretty, pretty-timestamped]                   | gbogbo   | output format                                     |
| level    | okun | Rara      | [fatal, error, warn, http, info, debug, trace] | gbogbo   | verbose level                                     |