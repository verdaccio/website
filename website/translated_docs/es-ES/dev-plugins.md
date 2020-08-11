---
id: dev-plugins
title: "Extensiones en Desarrollo"
---

Existen muchas maneras de extender `verdaccio`, los tipos de extensiones soportados son:

* [Autenticación](plugin-auth.md)
* [Mediación](plugin-middleware.md)
* [Almacenamiento](plugin-storage.md)
* Tema
* Filtro de plugins

> Nosotros recomendamos desarrollar tus plugins usando [Definiciones de tipo Typescript](https://github.com/verdaccio/monorepo/tree/master/core/types).

# Other plugins

The following plugins are valid and in process of incubation.

## Theme Plugin

The plugin must return a function that returns a **string**. The string should be the absolute location of the root of your user interface.

### API

```javascript
const path = require('path');

module.exports = (...arguments) => {
  return path.join(__dirname, 'static');
};
```

It is imporant that the name of the plugin **must start with `verdaccio-theme-` prefix**.

### Theme Example

* [@verdaccio/ui-theme](https://github.com/verdaccio/ui): The default Verdaccio theme based in React.js.

## Filter Plugin

Since [`4.1.0`](https://github.com/verdaccio/verdaccio/pull/1313)

Filter plugins were introduced due a [request](https://github.com/verdaccio/verdaccio/issues/818) in order to be able to filter metadata from uplinks.

More [info in the PR](https://github.com/verdaccio/verdaccio/pull/1161).

```yaml
filters:
   storage-filter-blackwhitelist:
     filter_file: /path/to/file
```

### API

The method `filter_metadata` will allow you to filter metadata that comes from any uplink, it is `Promise` based and has to return the same metadata modified.

> Do not remove properties from the metadata, try to do not mutate rather return a new object.

    interface IPluginStorageFilter<T> extends IPlugin<T> {
        filter_metadata(packageInfo: Package): Promise<Package>;
    }