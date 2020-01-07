---
id: version-4.4.1-logger
title: Logs
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
  # Rotating log stream. As opções são passadas diretamente para o bunyan. Veja: https://github.com/trentm/node-bunyan#stream-type-rotating-file
  - {type: rotating-file, format: json, path: /path/to/log.jsonl, level: http, options: {period: 1d}}
```

Use `SIGUSR2` para notificar o aplicativo, o arquivo de log foi girado e ele precisa ser reaberto. Nota: A atividade de giro de log não é suportada no modo de cluster. [Veja aqui](https://github.com/trentm/node-bunyan#stream-type-rotating-file)

### Configuração

| Propriedade | Tipo   | Obrigatório | Exemplo                                        | Suporte  | Descrição                                                 |
| ----------- | ------ | ----------- | ---------------------------------------------- | -------- | --------------------------------------------------------- |
| tipo        | string | Não         | [stdout, file]                                 | completo | define a saída                                            |
| caminho     | string | Não         | verdaccio.log                                  | completo | se o tipo é arquivo, define a localização daquele arquivo |
| formato     | string | Não         | [pretty, pretty-timestamped]                   | completo | formato da saída                                          |
| nível       | string | Não         | [fatal, erro, aviso, http, info, debug, trace] | completo | level detalhado                                           |
