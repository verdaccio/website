---
id: version-4.4.1-dev-plugins
title: Разработка плагинов
original_id: dev-plugins
---

Есть много способов расширить `verdaccio`, поддерживаются следующие типы плагинов:

* [Аутентификация](plugin-auth.md)
* [Middleware](plugin-middleware.md)
* [Хранилище](plugin-storage.md)
* Theme
* Filter plugins

> We recommend developing plugins using our [Typescript type definitions](https://github.com/verdaccio/monorepo/tree/master/core/types).

<div id="codefund">''</div>

# Other plugins

The following plugins are valid and in process of incubation.


## Плагин UI темы

The plugin must return a function that returns a **string**. The string should be the absolute location of the root of your user interface.

### API

```javascript
const path = require('path');

module.exports = (...arguments) => {
  return path.join(__dirname, 'static');
};
```

It is imporant that the name of the plugin **must start with `verdaccio-theme-` prefix**.

### Пример темы

* [@verdaccio/ui-theme](https://github.com/verdaccio/ui): Тема по умолчанию для Verdaccio, написана на React.js.

## Плагин фильтрации

Применим, начиная с [`4.1.0`](https://github.com/verdaccio/verdaccio/pull/1313)


Плигин фильтрации был создан по [запросу](https://github.com/verdaccio/verdaccio/issues/818), для того, чтобы фильтровать метаданные из аплинков.

Больше информации [в PR](https://github.com/verdaccio/verdaccio/pull/1161).

```yaml
filters:
   storage-filter-blackwhitelist:
     filter_file: /path/to/file
```


### API

Метод `filter_metadata` позволяет фильтровать метаданные, которые пришли из аплинка, это `Promise`, который должен возвращать модифицированные данныые.

> Не удаляйте свойства метаданных, попытайтесь изменить их, вместо создания нового объекта.

```
interface IPluginStorageFilter<T> extends IPlugin<T> {
    filter_metadata(packageInfo: Package): Promise<Package>;
}
```
