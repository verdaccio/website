---
id: olugbasilẹ
title: "Olugbasilẹ"
---

Gẹgẹbi eyikeyi ohun elo ayelujara, verdaccio ni olugbasilẹ alabawa ti alakanṣe kan. O le ṣe asọye awọn orisirisi oniruuru awọn abajade.

```yaml
logs:
  # console output
  - {type: stdout, format: pretty, level: http}
  # file output
  - {type: file, path: verdaccio.log, level: info}
  # Rotating log stream. Awọn aṣayan n jẹ fifransẹ ni taara si bunyan. Wo: https://github.com/trentm/node-bunyan#stream-type-rotating-file
  - {type: rotating-file, format: json, path: /path/to/log.jsonl, level: http, options: {period: 1d}}
```

Lo `SIGUSR2` lati pe akiyesi ohun elo naa, faili-igbasilẹ naa jẹ yi yipo atipe o nilo lati ṣe atunsi rẹ. Akiyesi: Sise ayipo odò igbasilẹ ko ni atilẹyin ni ipo iṣupọ. [Wo ibi](https://github.com/trentm/node-bunyan#stream-type-rotating-file)

### Iṣeto

| Ohun ini | Iru  | Ti o nilo | Apẹẹrẹ                                         | Atilẹyin | Apejuwe                                           |
| -------- | ---- | --------- | ---------------------------------------------- | -------- | ------------------------------------------------- |
| iru      | okun | Rara      | [stdout, file]                                 | gbogbo   | ṣe asọye abajade naa                              |
| ọna      | okun | Rara      | verdaccio.log                                  | gbogbo   | if type is file, define the location of that file |
| format   | okun | Rara      | [pretty, pretty-timestamped]                   | gbogbo   | output format                                     |
| level    | okun | Rara      | [fatal, error, warn, http, info, debug, trace] | gbogbo   | verbose level                                     |