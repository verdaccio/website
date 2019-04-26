---
id: version-3.8.6-webui
title: Interface d'Utilisateur Web
original_id: webui
---

<p align="center"><img src="https://github.com/verdaccio/verdaccio/blob/master/assets/gif/verdaccio_big_30.gif?raw=true"></p>

Verdaccio dispoe d'une interface d'utilisateur web pour afficher uniquement les paquets privés et qui peut être personnalisée.

```yaml
web:
  enable: true
  title: Verdaccio
  logo: logo.png
  scope:
```

Toutes les restrictions d'accès définies pour la [protection des pacquets](protect-your-dependencies.md) s'appliquent également à l'Interface Web.

### Configuration

| Propriété | Type      | Obligatoire | Exemple                        | Soutien | Description                                                                                                                                                          |
| --------- | --------- | ----------- | ------------------------------ | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| enable    | booléenne | Non         | vrai/faux                      | tous    | permettre l’affichage de l’interface web                                                                                                                             |
| titre     | chaîne    | Non         | Verdaccio                      | tous    | Description du titre HTML                                                                                                                                            |
| logo      | chaîne    | Non         | http://my.logo.domain/logo.png | tous    | un URI où se trouve le logo                                                                                                                                          |
| scope     | chaîne    | Non         | \\@myscope                   | tous    | Si vous utilisez ce registre pour un modul spécifique, définissez le dans l'en-tête des instructions de l'interface Web de l'utilisateur (note: escape @ with \\@) |