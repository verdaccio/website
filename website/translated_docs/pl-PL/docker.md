---
id: docker
title: Docker
---

![alt Docker Pulls Count](https://dockeri.co/image/verdaccio/verdaccio "Docker Pulls Count")

To pull the latest pre-built [docker image](https://hub.docker.com/r/verdaccio/verdaccio/):

```bash
docker pull verdaccio/verdaccio
```

![Docker pull](assets/docker_verdaccio.gif)

<div id="codefund">''</div>

## Wersje oznaczone

Since version `v2.x` you can pull docker images by [tag](https://hub.docker.com/r/verdaccio/verdaccio/tags/), as follows:

Dla wersji głównej:

```bash
docker pull verdaccio/verdaccio:4
```

Dla wersji drugorzędnej:

```bash
docker pull verdaccio/verdaccio:4.0
```

Dla określonej (poprawka) wersji:

```bash
docker pull verdaccio/verdaccio:4.0.0
```

> Jeśli interesuje Cię lista tagów, [odwiedź witrynę Docker Hub](https://hub.docker.com/r/verdaccio/verdaccio/tags/).

## Running Verdaccio using Docker

Aby uruchomić kontener dokowania:

```bash
docker run -it --rm --name verdaccio -p 4873:4873 verdaccio/verdaccio
```

The last argument defines which image to use. The above line will pull the latest prebuilt image from dockerhub, if you haven't done that already.

Jeśli masz [zbuduj obraz lokalnie](#build-your-own-docker-image), użyj `verdaccio` jako ostatniego argumentu.

Możesz użyć `-v` do związania uchwytu `conf`, `magazynu` i `dodatków` do systemu plików hostów:

```bash
V_PATH=/path/for/verdaccio; docker run -it --rm --name verdaccio \
  -p 4873:4873 \
  -v $V_PATH/conf:/verdaccio/conf \
  -v $V_PATH/storage:/verdaccio/storage \
  -v $V_PATH/plugins:/verdaccio/plugins \
  verdaccio/verdaccio
```

> Note: Verdaccio runs as a non-root user (uid=10001) inside the container, if you use bind mount to override default, you need to make sure the mount directory is assigned to the right user. In above example, you need to run `sudo chown -R 10001:65533 /opt/verdaccio` otherwise you will get permission errors at runtime. [Zalecane jest użycie woluminu dokujacego](https://docs.docker.com/storage/volumes/) zamiast używania wiązania uchwytu.

Verdaccio 4 provides a new set of environment variables to modify either permissions, port or http protocol. Here the complete list:

| Właściwość            | default          | Opis                                               |
| --------------------- | ---------------- | -------------------------------------------------- |
| VERDACCIO_APPDIR      | `/opt/verdaccio` | the docker working directory                       |
| VERDACCIO_USER_NAME | `verdaccio`      | the system user                                    |
| VERDACCIO_USER_UID  | `10001`          | the user id being used to apply folder permissions |
| VERDACCIO_PORT        | `4873`           | the verdaccio port                                 |
| VERDACCIO_PROTOCOL    | `http`           | the default http protocol                          |

### Wtyczki

Wtyczki mogą być instalowane w oddzielnym katalogu i montowane przy użyciu Docker lub Kubernetes, jednak upewnij się, że budujesz wtyczki z natywnymi zależnościami używając tego samego obrazu podstawowego, co plik Dockerfile Verdaccio.

```docker
FROM verdaccio/verdaccio

USER root

ENV NODE_ENV=production

RUN npm i && npm install verdaccio-s3-storage

USER verdaccio
```

### Docker and custom port configuration

Any `host:port` configured in `conf/config.yaml` under `listen` **is currently ignored when using docker**.

If you want to reach Verdaccio docker instance under different port, lets say `5000` in your `docker run` command add the environment variable `VERDACCIO_PORT=5000` and then expose the port `-p 5000:5000`.

```bash
V_PATH=/path/for/verdaccio; docker run -it --rm --name verdaccio \
  -e "VERDACCIO_PORT=8080" -p 8080:8080 \  
  verdaccio/verdaccio
```

Of course the numbers you give to `-p` paremeter need to match.

### Using HTTPS with Docker

Możesz skonfigurować protokół verdaccio, którego verdaccio będzie nasłuchiwał, podobnie jak konfigurację portu. Musisz nadpisać wartość domyślną("http") zmiennej środowiskowej `PROTOCOL` na "https", po określeniu certyfikatów w pliku config.yaml.

```bash
docker run -it --rm --name verdaccio \
  --env "VERDACCIO_PROTOCOL=https" -p 4873:4873
  verdaccio/verdaccio
```

### Using docker-compose

1. Pobierz najnowszą wersję [docker-compose](https://github.com/docker/compose).
2. Build and run the container:

```bash
$ docker-compose up --build
```

You can set the port to use (for both container and host) by prefixing the above command with `VERDACCIO_PORT=5000`.

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

Docker wygeneruje nazwany wolumin, w którym będą przechowywane trwałe dane aplikacji. Możesz użyć`docker inspect` lub `docker volume inspect`, aby odsłonić fizyczną lokalizację woluminu i edytować konfigurację, taką jak:

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

## Build your own Docker image

```bash
docker build -t verdaccio .
```

Istnieje również skrypt npm do budowania obrazu docker, więc możesz również:

```bash
yarn run build:docker
```

Uwaga: Pierwsza kompilacja zajmuje kilka minut, ponieważ wymaga uruchomienia `npm install`, i zajmie to dużo czasu za każdym razem, gdy zmienisz dowolny plik, który nie jest wymieniony w `.dockerignore`.

Please note that for any of the above docker commands you need to have docker installed on your machine and the docker executable should be available on your `$PATH`.

## Docker Examples

Istnieje osobny magazyn, który obsługuje wiele konfiguracji do komponowania obrazów Docker za pomocą `verdaccio`, na przykład jako odwrotnego proxy:

<https://github.com/verdaccio/docker-examples>

## Niestandardowe Kompilacje Docker'a

> If you have made an image based on Verdaccio, feel free to add it to this list.

* [docker-verdaccio-gitlab](https://github.com/snics/docker-verdaccio-gitlab)
* [docker-verdaccio](https://github.com/deployable/docker-verdaccio)
* [docker-verdaccio-s3](https://github.com/asynchrony/docker-verdaccio-s3) Private NPM container that can backup to s3
* [docker-verdaccio-ldap](https://github.com/snadn/docker-verdaccio-ldap)
* [verdaccio-ldap](https://github.com/nathantreid/verdaccio-ldap)
* [verdaccio-komponuj-lokalny-most](https://github.com/shingtoli/verdaccio-compose-local-bridge)
* [docker-verdaccio](https://github.com/Global-Solutions/docker-verdaccio)
* [verdaccio-docker](https://github.com/idahobean/verdaccio-docker)
* [verdaccio-server](https://github.com/andru255/verdaccio-server)
* [coldrye-debian-verdaccio](https://github.com/coldrye-docker/coldrye-debian-verdaccio) docker image providing verdaccio from coldrye-debian-nodejs.