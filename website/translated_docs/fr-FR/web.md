---
id: webui
title: "Interface d'Utilisateur Web"
---
![Uplinks](https://user-images.githubusercontent.com/558752/52916111-fa4ba980-32db-11e9-8a64-f4e06eb920b3.png)

Verdaccio dispoe d'une interface d'utilisateur web pour afficher uniquement les paquets privés et qui peut être personnalisée.

```yaml
web:
  enable: true
  title: Verdaccio
  logo: logo.png
  gravatar: true | false
  scope: @scope
  sort_packages: asc | desc
```

Toutes les restrictions d'accès définies pour la [protection des pacquets](protect-your-dependencies.md) s'appliquent également à l'Interface Web.

### Configuration

| Propriété     | Type                 | Obligatoire | Exemple                        | Soutien  | Description                                                                                                                                                          |
| ------------- | -------------------- | ----------- | ------------------------------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| enable        | booléenne            | Non         | vrai/faux                      | tous     | permettre l’affichage de l’interface web                                                                                                                             |
| titre         | chaîne de caractères | Non         | Verdaccio                      | tous     | Description du titre HTML                                                                                                                                            |
| gravatar      | booléenne            | Non         | vrai                           | `>v4` | Gravatars will be generated under the hood if this property is enabled                                                                                               |
| sort_packages | [asc,desc]           | Non         | asc                            | `>v4` | By default private packages are sorted by ascending                                                                                                                  |
| logo          | chaîne               | Non         | http://my.logo.domain/logo.png | tous     | a URI where logo is located (header logo)                                                                                                                            |
| scope         | chaîne               | Non         | \\@myscope                   | tous     | Si vous utilisez ce registre pour un modul spécifique, définissez le dans l'en-tête des instructions de l'interface Web de l'utilisateur (note: escape @ with \\@) |

> It is recommended the logo size has the following size `40x40` pixels.