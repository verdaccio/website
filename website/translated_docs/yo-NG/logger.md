---
id: olugbasilẹ
title: "Olugbasilẹ"
---

As with any web application, Verdaccio has a customisable built-in logger. You can define multiple types of outputs.

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

| Ohun ini | Iru  | Ti o nilo | Apẹẹrẹ                                         | Atilẹyin | Apejuwe                                          |
| -------- | ---- | --------- | ---------------------------------------------- | -------- | ------------------------------------------------ |
| iru      | okun | Rara      | [stdout, file]                                 | gbogbo   | ṣe asọye abajade naa                             |
| ọna      | okun | Rara      | verdaccio.log                                  | gbogbo   | ti iru ẹ ba jẹ faili, ṣe asọye aaye ti faili naa |
| ọna      | okun | Rara      | [pretty, pretty-timestamped]                   | gbogbo   | ọna abajade                                      |
| ipele    | okun | Rara      | [fatal, error, warn, http, info, debug, trace] | gbogbo   | ipele verbose                                    |