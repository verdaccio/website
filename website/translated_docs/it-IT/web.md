---
id: webui
title: "Interfaccia Utente Web"
---

![Uplink](https://user-images.githubusercontent.com/558752/52916111-fa4ba980-32db-11e9-8a64-f4e06eb920b3.png)

Verdaccio offre un'interfaccia web utente per mostrare solo i pacchetti privati e può essere personalizzata,.

```yaml
web:
  enable: true
  title: Verdaccio
  logo: logo.png
  primary_color: "#4b5e40"
  gravatar: true | false
  scope: "@scope"
  sort_packages: asc | desc
```

Tutte le restrizioni di accesso definite per [proteggere i pacchetti](protect-your-dependencies.md) si applicano anche all'interfaccia Web.

### Configurazione

| Proprietà     | Tipo               | Richiesto | Esempio                                                       | Supporto   | Descrizione                                                                                                                                                      |
| ------------- | ------------------ | --------- | ------------------------------------------------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| enable        | variabile booleana | No        | vero/falso                                                    | tutti      | abilita l'interfaccia web                                                                                                                                        |
| title         | stringa            | No        | Verdaccio                                                     | tutti      | Descrizione del titolo HTML                                                                                                                                      |
| gravatar      | variabile booleana | No        | vero                                                          | `>v4`   | Se questa proprietà viene abilitata verranno generati dei gravatar internamente                                                                                  |
| sort_packages | [asc,desc]         | No        | asc                                                           | `>v4`   | Di default i pacchetti privati sono ordinati in ordine crescente                                                                                                 |
| logo          | stringa            | No        | `/local/path/to/my/logo.png` `http://my.logo.domain/logo.png` | tutti      | un URI in cui si trova il logo (logo intestazione)                                                                                                               |
| primary_color | stringa            | No        | "#4b5e40"                                                     | `>4`    | Il colore primario da utilizzare in tutta l'Interfaccia Utente (intestazione, ecc.)                                                                              |
| scope         | stringa            | No        | @myscope                                                      | `>v3.x` | Se si utilizza questo registro per uno specifico module scope, definire tale scope per impostarlo nell'intestazione delle istruzioni dell'interfaccia web utente |

> Si raccomanda che la dimensione del logo sia di dimensione `40x40` pixel.