---
id: version-4.4.1-caching
title: Стратегии кэширования
original_id: caching
---

Verdaccio кэширует все пакеты по умолчанию в папку `/storage`. Но если вы хотите, вы можете перейти на другие стратегии. С помощью плагинов вы можете использовать облако или любую базу данных.

<div id="codefund">''</div>

## Сценарии кэширования

* Build a Node.js project on **Continous Integration** (Bamboo, GitLab, Jenkins, etc) servers is a task that might take several times at a day, thus, the server will download tons of tarballs from the registry every time takes place.  Ведь обычно CI-инструменты очищают кэш после каждой сборки, и процесс загрузки каждый раз начинается заново. Это напрасная нагрузка на сеть и напрасная трата трафика. **You can use Verdaccio for caching tarballs and metadata in our internal network and give a boost in your build time.**
* **Latency and Connectivity**, not all countries enjoy a high-speed connection. По этой причине, иметь кэшированные в вашей сети пакеты - очень удобно. Или вы путешествуете, или у вас слабое соединение, или роуминг, или вы находитесь в стране с сильным фаерволом, который может повлиять на пользовательский опыт (в смысле: повредить tar-файлы).
* **Offline Mode**, all Node Package Managers nowadays uses their own internal cache, but it common that different projects might use different tools, which implies lock files and so on. Это делает невозможным использование общего кэша, и требуется централизованное решение, например, проксирующий репозиторий Verdaccio, который кэширует метаданные и tar-файлы, загруженные по требованию пользователя, и позволяет совместно их использовать.
* Avoid that any remote registry suddenly returns *HTTP 404* error for tarballs were previously available a.k.a ([left-pad issue](https://www.theregister.co.uk/2016/03/23/npm_left_pad_chaos/)).


# Стратегии для ускорения сборки

> Мы ищем новые стратегии, не стесняйтесь делиться опытом на этом поле.

## Отключение кэширования tar-файлов

Если у вас не так много места, вам может понадобится отключение кэширования tar-файлов, установите `cache` в значение false для каждого аплинка, и только метаданные будут кэшироваться.

```
uplinks:
  npmjs:
    url: https://registry.npmjs.org/
    cache: false
```

## Увеличение времени жизни метаданных

 По умолчанию, время жизни метаданных в кэше Verdaccio составляет 2 минуты, после чего метаданные будут снова запрошены из удаленного репозитория.

```yaml
uplinks:
  npmjs:
    url: https://registry.npmjs.org/
    maxage: 30m
```

Если увеличить значение `maxage` для каждого `аплинка`, удаленный репозиторий будет опрашиваться реже. Это может стать отличной стратегией, если ваши зависимости обновляются не слишком часто.


## Использование памяти вместо диска

Иногда закэшировать пакеты не так важно, а важно получить их из разных репозиториев и ускорить сборку. Есть два плагина, которые позволяют избежать записи пакетов на диск, и хранить их в памяти.

```bash
  npm install -g verdaccio-auth-memory
  npm install -g verdaccio-memory
```

Конфиграция выглядит примерно так

```yaml
auth:
  auth-memory:
    users:
      foo:
        name: test
        password: test
store:
  memory:
    limit: 1000
```

Помните, что когда сервер будет перезапущен, все данные будут потеряны, поэтому мы рекомендуем этот вариант в случаях, когда вам вообще не нужно хранить пакеты.
