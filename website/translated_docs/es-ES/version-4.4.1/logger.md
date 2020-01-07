---
id: version-4.4.1-logger
title: Registrador
original_id: logger
---

As any web application, verdaccio has a customisable built-in logger. You can define multiple types of outputs.

<div id="codefund">''</div>

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

### Configuración

| Propiedad | Tipo   | Requerido | Ejemplo                                        | Soporte | Descripción                                               |
| --------- | ------ | --------- | ---------------------------------------------- | ------- | --------------------------------------------------------- |
| type      | string | No        | [stdout, file]                                 | all     | define la salida                                          |
| path      | string | No        | verdaccio.log                                  | all     | si el tipo es archivo, define la ubicación de ese archivo |
| format    | string | No        | [pretty, pretty-timestamped]                   | all     | formato de salida                                         |
| level     | string | No        | [fatal, error, warn, http, info, debug, trace] | all     | nivel verboso                                             |
