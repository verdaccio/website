---
id: caching
title: "Стратегии кэширования"
---

Verdaccio кэширует все пакеты по умолчанию в папку `/storage`. Но если вы хотите, вы можете перейти на другие стратегии. С помощью плагинов вы можете использовать облако или любую базу данных.

## Сценарии кэширования

* Сборка Node.js-проекта в рамках **непрерывной интеграции** (Bamboo, GitLab, Jenkins, и т.д.) - это процесс, который может запускаться несколько раз в день, при этом загружая кучу tar-файлов из репозитория. Обычно, CI-инструменты очищают кэш после каждой сборки, и процесс загрузки каждый раз начинается заново. Это напрасная нагрузка на сеть и трата трафика. **Вы можете использовать Verdaccio для кэширования tar-файлов и метаданных в своей внутренней сети и этим ускорить сборку.**
* **Задержка и Доступность**, не во всех странах есть высокоскоростное соединение. По этой причине, иметь кэшированные в вашей сети пакеты - очень удобно. Или вы путешествуете, или у вас слабое соединение, или роуминг, или вы находитесь в стране с сильным фаерволом, который может повлиять на пользовательский опыт (в смысле: повредить tar-файлы).
* **Офлайновый режим**, все менеджеры пакетов в наши дни имеют свой внутренний кэш, но обычно у каждого проекта свой инструментарий, своя система блокировки файлов и т.д. Это делает невозможным использование общего кэша, и требуется централизованное решение, проксирующий реестр Verdaccio, который кэширует метаданные и tar-файлы, загруженные по требованию пользователя, и позволяет совместно их использовать.
* Позволяет избегнуть ситуации, когда удаленный репозиторий пакетов возвращает ошибку *HTTP 404* для tar-файлов, которые были доступны совсем недавно (a.k.a [случай с left-pad](https://www.theregister.co.uk/2016/03/23/npm_left_pad_chaos/)).

# Стратегии для ускорения сборки

> Мы ищем новые стратегии, не стесняйтесь делиться опытом на этом поле.

## Отключение кэширования tar-файлов

Если у вас не так много места, вам может понадобится отключение кэширования tar-файлов, установите `cache` в значение false для каждого аплинка, и только метаданные будут кэшироваться.

    uplinks:
      npmjs:
        url: https://registry.npmjs.org/
        cache: false
    

## Увеличение времени жизни метаданных

Verdaccio by default waits 2 minutes to invalidate the cache metadata before fetching new information from the remote registry.

```yaml
uplinks:
  npmjs:
    url: https://registry.npmjs.org/
    maxage: 30m
```

Increasing the value of `maxage` in each `uplink` remotes will be asked less frequently. This might be a valid stragegy if you don't update dependencies so often.

## Using the memory instead the hardrive

Sometimes caching packages is not a critical step, rather than route packages from different registries and achiving faster build times. There are two plugins that avoid write in a phisical hardrive at all using the memory.

```bash
  npm install -g verdaccio-auth-memory
  npm install -g verdaccio-memory
```

The configuration looks like this

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

Remember, once the server is restarted the data is being lost, we recomend this setup in cases where you do not need to persist at all.