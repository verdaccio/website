---
id: logger
title: "Rejestrator"
---

Jak każda aplikacja sieci web, verdaccio posiada wbudowany konfigurowalny rejestrator. Możesz określić wiele typów wyjść.

<div id="codefund">''</div>

```yaml
logs:
  # console output
  - {type: stdout, format: pretty, level: http}
  # file output
  - {type: file, path: verdaccio.log, level: info}
  # Rotating log stream. Opcje są przekazywane bezpośrednio do bunyana. Zobacz: https://github.com/trentm/node-bunyan#stream-type-rotating-file
  - {type: rotating-file, format: json, path: /path/to/log.jsonl, level: http, options: {period: 1d}}
```

Użyj `SIGUSR2`, aby powiadomić aplikację, plik dziennika został obrócony i musi zostać ponownie otwarty. Uwaga: Rotacyjny strumień dziennika nie jest obsługiwany w trybie klastra. [Zobacz tutaj](https://github.com/trentm/node-bunyan#stream-type-rotating-file)

### Konfiguracja

| Właściwość | Typ         | Wymagane | Przykład                                       | Wsparcie  | Opis                                                    |
| ---------- | ----------- | -------- | ---------------------------------------------- | --------- | ------------------------------------------------------- |
| typ        | ciąg znaków | Nie      | [stdout, plik]                                 | wszystkie | zdefiniuj wyjście                                       |
| ścieżka    | ciąg znaków | Nie      | verdaccio.log                                  | wszystko  | jeśli typem jest plik, zdefiniuj lokalizację tego pliku |
| format     | ciąg znaków | Nie      | [pretty, pretty-timestamped]                   | wszystko  | format wyjścia                                          |
| poziom     | ciąg znaków | Nie      | [fatal, error, warn, http, info, debug, trace] | wszystko  | verbose level                                           |