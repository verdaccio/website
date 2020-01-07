---
id: version-4.4.1-dev-plugins
title: Sviluppare Estensioni
original_id: dev-plugins
---

Esistono diversi modi di ampliare `verdaccio`, i tipi di estensioni supportati sono:

* [Autenticazione](plugin-auth.md)
* [Middleware](plugin-middleware.md)
* [Archiviazione](plugin-storage.md)
* Theme
* Filter plugins

> We recommend developing plugins using our [Typescript type definitions](https://github.com/verdaccio/monorepo/tree/master/core/types).

<div id="codefund">''</div>

# Other plugins

The following plugins are valid and in process of incubation.


## Theme Plugin

The plugin must return a function that returns a **string**. La stringa dovrebbe essere l'ubicazione certa della root dell'interfaccia utente.

### API

```javascript
const path = require('path');

module.exports = (...arguments) => {
  return path.join(__dirname, 'static');
};
```

It is imporant that the name of the plugin **must start with `verdaccio-theme-` prefix**.

### Esempio di Tema

* [@verdaccio/ui-theme](https://github.com/verdaccio/ui): Il tema di default di Verdaccio costruito su React.js.

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

```
interface IPluginStorageFilter<T> extends IPlugin<T> {
    filter_metadata(packageInfo: Package): Promise<Package>;
}
```
