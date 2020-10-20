---
id: docker
title: Docker
---

![alt Docker Pulls Count](https://dockeri.co/image/verdaccio/verdaccio "Docker Pulls Count")

Для скачивания последней версии [Docker образа](https://hub.docker.com/r/verdaccio/verdaccio/):

```bash
docker pull verdaccio/verdaccio
```

![Docker pull](assets/docker_verdaccio.gif)

## Версии с меткой

Начиная с версии `v2.x` вы можете скачать Docker образ с помощью [метки](https://hub.docker.com/r/verdaccio/verdaccio/tags/), вот так:

Мажорная версия:

```bash
docker pull verdaccio/verdaccio:4
```

Минорная версия:

```bash
docker pull verdaccio/verdaccio:4.0
```

Конкретная версия (патч):

```bash
docker pull verdaccio/verdaccio:4.0.0
```

> Если вас интересует весь список тегов, [посетите нашу страницу на сайте Docker Hub](https://hub.docker.com/r/verdaccio/verdaccio/tags/).

## Запускаем Verdaccio, используя Docker

Запуск Docker контейнера:

```bash
docker run -it --rm --name verdaccio -p 4873:4873 verdaccio/verdaccio
```

Последний аргумент указывает, какой именно образ нужно использовать. Эта команда скачает последний образ из dockerhub, если вы ещё не сделали этого ранее.

Если этот образ [у вас уже скачан](#build-your-own-docker-image) используйте `verdaccio` в качестве последнего аргумента.

Вы можете использовать `-v` для того, что бы примонтировать каталоги `conf`, `storage` и `plugins` к основной (host) файловой системе:

```bash
V_PATH=/path/for/verdaccio; docker run -it --rm --name verdaccio \
  -p 4873:4873 \
  -v $V_PATH/conf:/verdaccio/conf \
  -v $V_PATH/storage:/verdaccio/storage \
  -v $V_PATH/plugins:/verdaccio/plugins \
  verdaccio/verdaccio
```

> if you are running in a server, you might want to add -d to run it in the background
> 
> Note: Verdaccio runs as a non-root user (uid=10001) inside the container, if you use bind mount to override default, you need to make sure the mount directory is assigned to the right user. In above example, you need to run `sudo chown -R 10001:65533 /opt/verdaccio` otherwise you will get permission errors at runtime. [Use docker volume](https://docs.docker.com/storage/volumes/) is recommended over using bind mount.

Verdaccio 4 предоставляет новый набор переменных окружения для модификации прав доступа, порта и http-протокола. Вот полный список:

| Свойство              | По умолчанию     | Описание                                                 |
| --------------------- | ---------------- | -------------------------------------------------------- |
| VERDACCIO_APPDIR      | `/opt/verdaccio` | рабочая папка докера                                     |
| VERDACCIO_USER_NAME | `verdaccio`      | системный пользователь                                   |
| VERDACCIO_USER_UID  | `10001`          | id юзера, который используется для задания прав на папки |
| VERDACCIO_PORT        | `4873`           | порт сервера Verdaccio                                   |
| VERDACCIO_PROTOCOL    | `http`           | http-протокол по умолчанию                               |

### Плагины

Плагины могут быть установлены в отдельную директорию и смонтированы с использованием Docker или Kubernetes. Однако вам нужно убедиться, что вы используете встроенные плагины с родными зависимостями, использующими такой же базовый образ как и в Verdaccio Dockerfile.

```docker
FROM verdaccio/verdaccio

USER root

ENV NODE_ENV=production

RUN npm i && npm install verdaccio-s3-storage

USER verdaccio
```

### Docker и кастомная конфигурация порта

Свойства `host:port`, определенные в `conf/config.yaml` в секции `listen` **, будут проигнорированы при использовании в docker**.

Если вам необходимо, чтобы docker-экземпляр verdaccio работал на другом порту, скажем, на `5000`, при запуске команды `docker run` добавьте переменную окружения `VERDACCIO_PORT=5000` и выставьте этот порт наружу `-p 5000:5000`.

```bash
V_PATH=/path/for/verdaccio; docker run -it --rm --name verdaccio \
  -e "VERDACCIO_PORT=8080" -p 8080:8080 \  
  verdaccio/verdaccio
```

Конечно, цифры, которые вы поставили в параметр `-p`, должны совпадать.

### Использование HTTPS с Docker

Вы можете настроить протокол, который verdaccio будет слушать, аналогично тому, как ранее конфигурировался порт. Необходмило переопределить значение по умолчанию ("http") переменной окружения `PROTOCOL` на "https", после того, как вы укажете сертификаты в config.yaml.

```bash
docker run -it --rm --name verdaccio \
  --env "VERDACCIO_PROTOCOL=https" -p 4873:4873
  verdaccio/verdaccio
```

### Использование docker-compose

1. Возьмите последнюю версию [docker-compose](https://github.com/docker/compose).
2. Соберите и запустите контейнер:

```bash
$ docker-compose up --build
```

Вы можете указать, какой порт использовать (для контейнера и хоста), предварив команду выше указанием `VERDACCIO_PORT=5000`.

```yaml
version: '3.1'

services:
  verdaccio:
    image: verdaccio/verdaccio
    container_name: "verdaccio"
    networks:
      - node-network
    environment:
      - VERDACCIO_PORT=4873
    ports:
      - "4873:4873"
    volumes:
      - "./storage:/verdaccio/storage"
      - "./config:/verdaccio/conf"
      - "./plugins:/verdaccio/plugins"  
networks:
  node-network:
    driver: bridge
```

Docker сгенерирует именованный раздел, в котором будут храниться данные приложения. Вы можете использовать `docker inspect` или `docker volume inspect` для определения физического местоположения и изменения конфигурации, например:

```bash
$ docker volume inspect verdaccio_verdaccio
[
    {
        "Name": "verdaccio_verdaccio",
        "Driver": "local",
        "Mountpoint": "/var/lib/docker/volumes/verdaccio_verdaccio/_data",
        "Labels": null,
        "Scope": "local"
    }
]

```

## Сборка собственного Docker образа

```bash
docker build -t verdaccio .
```

Есть так же npm скрипт для сборки Docker образа, по этому вы можете выполнить:

```bash
yarn run build:docker
```

Примечание: Первая сборки может занять несколько минут, потому что нужно выполнить `npm install`, это будет занимать много времени, всякий раз, как вы измените, что либо, что не перечислено в `.dockerignore`.

Имейте в виду, что для выполнения всех, представленных выше команд, Docker должен быть установлен на вашем компьютере и исполняемый файл должен быть представлен в переменной окружения `$PATH`.

## Примеры

Это отдельные репозитории, которые содержат многожество конфигураций для сборки Docker образов с `verdaccio`, для запуска обратного прокси:

<https://github.com/verdaccio/docker-examples>

## Пользовательские сборки

> Если у вас есть образ, основанный на Verdaccio, не стесняйтесь - добавляйте его в этот список.

* [docker-verdaccio-multiarch](https://github.com/hertzg/docker-verdaccio-multiarch) Multiarch image mirrors
* [docker-verdaccio-gitlab](https://github.com/snics/docker-verdaccio-gitlab)
* [docker-verdaccio](https://github.com/deployable/docker-verdaccio)
* [docker-verdaccio-s3](https://github.com/asynchrony/docker-verdaccio-s3) Private NPM container that can backup to s3
* [docker-verdaccio-ldap](https://github.com/snadn/docker-verdaccio-ldap)
* [verdaccio-ldap](https://github.com/nathantreid/verdaccio-ldap)
* [verdaccio-compose-local-bridge](https://github.com/shingtoli/verdaccio-compose-local-bridge)
* [docker-verdaccio](https://github.com/Global-Solutions/docker-verdaccio)
* [verdaccio-docker](https://github.com/idahobean/verdaccio-docker)
* [verdaccio-server](https://github.com/andru255/verdaccio-server)
* [coldrye-debian-verdaccio](https://github.com/coldrye-docker/coldrye-debian-verdaccio) docker image providing verdaccio from coldrye-debian-nodejs.