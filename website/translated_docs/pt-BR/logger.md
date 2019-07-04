---
id: logger
title: "Logs"
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

| Propriedade | Tipo   | Obrigatório | Exemplo                                        | Suporte  | Descrição                                         |
| ----------- | ------ | ----------- | ---------------------------------------------- | -------- | ------------------------------------------------- |
| type        | string | Não         | [stdout, file]                                 | completo | define the output                                 |
| path        | string | Não         | verdaccio.log                                  | completo | if type is file, define the location of that file |
| format      | string | Não         | [pretty, pretty-timestamped]                   | completo | output format                                     |
| level       | string | Não         | [fatal, error, warn, http, info, debug, trace] | completo | verbose level                                     |