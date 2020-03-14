---
id: version-4.5.0-webui
title: Interface d'Utilisateur Web
original_id: webui
---

![Uplinks](https://user-images.githubusercontent.com/558752/52916111-fa4ba980-32db-11e9-8a64-f4e06eb920b3.png)

<div id="codefund">''</div>

Verdaccio dispoe d'une interface d'utilisateur web pour afficher uniquement les paquets privés et qui peut être personnalisée.

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

Toutes les restrictions d'accès définies pour la [protection des pacquets](protect-your-dependencies.md) s'appliquent également à l'Interface Web.

### Internationalization

*Since v4.5.0*, there are translations available

```yaml
i18n:
  web: en-US  
```

> ⚠️ Only the languages in this [list](https://github.com/verdaccio/ui/tree/master/i18n/translations) are available, feel free to contribute with more. The default one is es-US

### Configuration

| Propriété     | Type       | Obligatoire | Exemple                                                       | Soutien    | Description                                                                                                              |
| ------------- | ---------- | ----------- | ------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------ |
| enable        | booléenne  | Non         | vrai/faux                                                     | tous       | permettre l’affichage de l’interface web                                                                                 |
| titre         | chaîne     | Non         | Verdaccio                                                     | tous       | Description du titre HTML                                                                                                |
| gravatar      | booléenne  | Non         | vrai                                                          | `>v4`   | Gravatars will be generated under the hood if this property is enabled                                                   |
| sort_packages | [asc,desc] | Non         | asc                                                           | `>v4`   | By default private packages are sorted by ascending                                                                      |
| logo          | chaîne     | Non         | `/local/path/to/my/logo.png` `http://my.logo.domain/logo.png` | tous       | a URI where logo is located (header logo)                                                                                |
| primary_color | chaîne     | Non         | "#4b5e40"                                                     | `>4`    | The primary color to use throughout the UI (header, etc)                                                                 |
| scope         | chaîne     | Non         | @myscope                                                      | `>v3.x` | If you're using this registry for a specific module scope, specify that scope to set it in the webui instructions header |


> It is recommended the logo size has the following size `40x40` pixels.
