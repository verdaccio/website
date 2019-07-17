---
id: logger
title: "Logs"
---

Como qualquer aplicativo da web, o verdaccio possui um logger integrado personalizável. Você pode definir vários tipos de saídas.

```yaml
logs:
  # console output
  - {type: stdout, format: pretty, level: http}
  # file output
  - {type: file, path: verdaccio.log, level: info}
  # Rotating log stream. As opções são passadas diretamente para o bunyan. Veja: https://github.com/trentm/node-bunyan#stream-type-rotating-file
  - {type: rotating-file, format: json, path: /path/to/log.jsonl, level: http, options: {period: 1d}}
```

Use `SIGUSR2` para notificar o aplicativo, o arquivo de log foi girado e ele precisa ser reaberto. Note: Rotating log stream is not supported in cluster mode. [See here](https://github.com/trentm/node-bunyan#stream-type-rotating-file)

### Configuration

| Propriedade | Tipo   | Obrigatório | Exemplo                                        | Suporte  | Descrição                                         |
| ----------- | ------ | ----------- | ---------------------------------------------- | -------- | ------------------------------------------------- |
| type        | string | Não         | [stdout, file]                                 | completo | define the output                                 |
| path        | string | Não         | verdaccio.log                                  | completo | if type is file, define the location of that file |
| format      | string | Não         | [pretty, pretty-timestamped]                   | completo | output format                                     |
| level       | string | Não         | [fatal, error, warn, http, info, debug, trace] | completo | verbose level                                     |