---
id: logger
title: "Logger"
---
Jako všechny webové aplikace má verdaccio přizpůsobitelný vestavěný logger. Můžete definovat různé typy výstupů.

```yaml
logs:
  # výstup konzole
  - {type: stdout, format: pretty, level: http}
  # výstup souboru
  - {type: file, path: verdaccio.log, level: info}
  # Střídající výstup logu. Možnosti jsou předány přímo do bunyan. Navštivte: https://github.com/trentm/node-bunyan#stream-type-rotating-file
  - {type: rotating-file, format: json, path: /path/to/log.jsonl, level: http, options: {period: 1d}}
```

Use `SIGUSR2` to notify the application, the log-file was rotated and it needs to reopen it. Note: Rotating log stream is not supported in cluster mode. [See here](https://github.com/trentm/node-bunyan#stream-type-rotating-file)

### Configuration

| Property | Type   | Required | Example                                        | Support | Description                                     |
| -------- | ------ | -------- | ---------------------------------------------- | ------- | ----------------------------------------------- |
| typ      | string | No       | [stdout, file]                                 | all     | definovat výstup                                |
| cesta    | string | No       | verdaccio.log                                  | all     | pokud je typ soubor, definujte umístění souboru |
| formát   | string | No       | [pretty, pretty-timestamped]                   | all     | výstupní formát                                 |
| úroveň   | string | No       | [fatal, error, warn, http, info, debug, trace] | all     | úroveň podrobností                              |