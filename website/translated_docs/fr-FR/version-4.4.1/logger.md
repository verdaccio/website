---
id: version-4.4.1-logger
title: Enregistreur
original_id: enregistreur
---

As any web application, verdaccio has a customisable built-in logger. You can define multiple types of outputs.

<div id="codefund">''</div>

```yaml
logs:
  # console output
  - {type: stdout, format: pretty, level: http}
  # file output
  - {type: file, path: verdaccio.log, level: info}
  # Rotating log stream. Les options sont transmises directement à Bunyan. Voir: https://github.com/trentm/node-bunyan#stream-type-rotating-file
  - {type: rotating-file, format: json, path: /path/to/log.jsonl, level: http, options: {period: 1d}}
```

En utilisant `SIGUSR2` pour notifier l'application, le fichier journal a été pivoté et doit être rouvert. Remarque: L'activité de rotation des journaux n'est pas prise en charge en mode cluster. [Voir ici](https://github.com/trentm/node-bunyan#stream-type-rotating-file)

### Configuration

| Propriété  | Type   | Obligatoire | Exemple                                        | Soutien | Description                                                    |
| ---------- | ------ | ----------- | ---------------------------------------------- | ------- | -------------------------------------------------------------- |
| type       | chaîne | Non         | [stdout, file]                                 | tous    | définir la sortie                                              |
| itinéraire | chaîne | Non         | verdaccio.log                                  | tous    | si le type est fichier, définissez l’emplacement de ce fichier |
| format     | chaîne | Non         | [pretty, pretty-timestamped]                   | tous    | format de la sortie                                            |
| niveau     | chaîne | Non         | [fatal, error, warn, http, info, debug, trace] | tous    | niveau détaillé                                                |
