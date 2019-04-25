---
id: version-3.8.6-webui
title: Webové uživatelské rozhraní
original_id: webui
---

<p align="center"><img src="https://github.com/verdaccio/verdaccio/blob/master/assets/gif/verdaccio_big_30.gif?raw=true"></p>

Verdaccio má webové uživatelské rozhraní pro zobrazení pouze soukromých balíčků a lze je přizpůsobit.

```yaml
web:
  enable: true
  title: Verdaccio
  logo: logo.png
  scope:
```

Všechna omezení přístupu definovaná v [ochraně balíčků](protect-your-dependencies.md) se budou vztahovat také na webové rozhraní.

### Konfigurace

| Vlastnost | Typ     | Požadované | Příklad                        | Podpora | Popis                                                                                                                                                |
| --------- | ------- | ---------- | ------------------------------ | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| enable    | boolean | Ne         | true/false                     | všechny | povolit zobrazení webového rozhraní                                                                                                                  |
| title     | řetězec | Ne         | Verdaccio                      | všechny | Popis názvu hlavičky HTML                                                                                                                            |
| logo      | řetězec | Ne         | http://my.logo.domain/logo.png | všechny | a URI where logo is located                                                                                                                          |
| scope     | řetězec | Ne         | \\@myscope                   | všechny | If you're using this registry for a specific module scope, specify that scope to set it in the webui instructions header (note: escape @ with \\@) |