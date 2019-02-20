---
id: webui
title: "Interfaccia utente web"
---
![Uplink](https://user-images.githubusercontent.com/558752/52916111-fa4ba980-32db-11e9-8a64-f4e06eb920b3.png)

Verdaccio offre un'interfaccia web utente per mostrare solo i pacchetti privati e può essere personalizzata,.

```yaml
web:
  enable: true
  title: Verdaccio
  logo: logo.png
  gravatar: true | false
  scope: @scope
  sort_packages: asc | desc
```

Tutte le restrizioni di accesso definite per [proteggere i pacchetti](protect-your-dependencies.md) si applicano anche all'interfaccia Web.

### Configurazione

| Proprietà     | Tipo               | Richiesto | Esempio                        | Supporto | Descrizione                                                                                                                                                                |
| ------------- | ------------------ | --------- | ------------------------------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| enable        | variabile booleana | No        | vero/falso                     | tutti    | abilita l'interfaccia web                                                                                                                                                  |
| title         | stringa            | No        | Verdaccio                      | tutti    | Descrizione del titolo HTML                                                                                                                                                |
| gravatar      | variabile booleana | No        | vero                           | `>v4` | Gravatars will be generated under the hood if this property is enabled                                                                                                     |
| sort_packages | [asc,desc]         | No        | asc                            | `>v4` | By default private packages are sorted by ascending                                                                                                                        |
| logo          | stringa            | No        | http://my.logo.domain/logo.png | tutti    | a URI where logo is located (header logo)                                                                                                                                  |
| scope         | stringa            | No        | \\@myscope                   | tutti    | Se si utilizza questo registro per uno specifico scope, definisci quello scope nelle istruzioni dell' intestazione dell'interfaccia web utente (nota: escape @ with \\@) |

> It is recommended the logo size has the following size `40x40` pixels.