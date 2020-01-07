---
id: version-4.4.1-logger
title: Logger
original_id: logger
---

Come qualunque applicazione web, verdaccio dispone di un logger incorporato personalizzabile. È possibile definire più tipi di uscite.

<div id="codefund">''</div>

```yaml
logs:
  # console output
  - {type: stdout, format: pretty, level: http}
  # file output
  - {type: file, path: verdaccio.log, level: info}
  # Rotating log stream. Le opzioni vengono passate direttamente a Bunyan. See: https://github.com/trentm/node-bunyan#stream-type-rotating-file
  - {type: rotating-file, format: json, path: /path/to/log.jsonl, level: http, options: {period: 1d}}
```

Utilizzare `SIGUSR2` per notificare all'applicazione, il file-log è stato ruotato ed è necessario riaprirlo. Nota: L'attività di rotazione dei log non è supportata in modalità cluster. [Vedere qui](https://github.com/trentm/node-bunyan#stream-type-rotating-file)

### Configurazione

| Proprietà | Tipo    | Richiesto | Esempio                                        | Supporto | Descrizione                                           |
| --------- | ------- | --------- | ---------------------------------------------- | -------- | ----------------------------------------------------- |
| tipo      | stringa | No        | [stdout, file]                                 | tutti    | definire l'output                                     |
| percorso  | stringa | No        | verdaccio.log                                  | tutti    | se il tipo è file, definire la posizione di quel file |
| formato   | stringa | No        | [pretty, pretty-timestamped]                   | tutti    | formato dell'output                                   |
| livello   | stringa | No        | [fatal, error, warn, http, info, debug, trace] | tutti    | livello dettagliato                                   |
