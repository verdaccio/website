---
id: docker
title: Docker
---

![alt Docker Pulls Count](http://dockeri.co/image/verdaccio/verdaccio "Docker Pulls Count")

To pull the latest pre-built [docker image](https://hub.docker.com/r/verdaccio/verdaccio/):

```bash
docker pull verdaccio/verdaccio
```

![Docker pull](assets/docker_verdaccio.gif)

<div id="codefund">''</div>

## Awọn ẹya to ni Isamisi

Since version `v2.x` you can pull docker images by [tag](https://hub.docker.com/r/verdaccio/verdaccio/tags/), as follows:

For a major version:

```bash
docker pull verdaccio/verdaccio:4
```

For a minor version:

```bash
docker pull verdaccio/verdaccio:4.0
```

For a specific (patch) version:

```bash
docker pull verdaccio/verdaccio:4.0.0
```

> Ti o ba nifẹsi akojọ lori awọn aami, [jọwọ lọ si aaye ayelujara ti Docker Hub](https://hub.docker.com/r/verdaccio/verdaccio/tags/).

## Mimu Verdaccio ṣiṣẹ nipa lilo Docker

To run the docker container:

```bash
docker run -it --rm --name verdaccio -p 4873:4873 verdaccio/verdaccio
```

Ariyanjiyan ikẹhin n sọ iru aworan to ma jẹ lilo. Ila to wa loke yoo fa aworan tuntun ti o ti wa ni kikọ tẹlẹ lati dockerhub, ti o ko ba ti ṣe bẹ tẹlẹ.

If you have [build an image locally](#build-your-own-docker-image) use `verdaccio` as the last argument.

You can use `-v` to bind mount `conf`, `storage` and `plugins` to the hosts filesystem:

```bash
V_PATH=/path/for/verdaccio; docker run -it --rm --name verdaccio \
  -p 4873:4873 \
  -v $V_PATH/conf:/verdaccio/conf \
  -v $V_PATH/storage:/verdaccio/storage \
  -v $V_PATH/plugins:/verdaccio/plugins \
  verdaccio/verdaccio
```

> Note: Verdaccio runs as a non-root user (uid=10001) inside the container, if you use bind mount to override default, you need to make sure the mount directory is assigned to the right user. In above example, you need to run `sudo chown -R 100:101 /opt/verdaccio` otherwise you will get permission errors at runtime. [Use docker volume](https://docs.docker.com/storage/volumes/) is recommended over using bind mount.

Verdaccio 4 n pese awọn iyipada ayika tuntun lati ṣayipada si boya awọn igbanilaaye, ibudo tabi Ilana Http. Eyi ni akojọ pipe:

| Ohun ini              | atilẹwa                | Apejuwe                                                                 |
| --------------------- | ---------------------- | ----------------------------------------------------------------------- |
| VERDACCIO_APPDIR      | `/opt/verdaccio-build` | ọna isisẹ ti docker naa                                                 |
| VERDACCIO_USER_NAME | `verdaccio`            | olumulo eto naa                                                         |
| VERDACCIO_USER_UID  | `10001`                | idanimọ olumulo naa ti o n jẹ lilo lati ṣamulo awọn igbanilaaye ti foda |
| VERDACCIO_PORT        | `4873`                 | ibudo verdaccio naa                                                     |
| VERDACCIO_PROTOCOL    | `http`                 | ilana http atilẹwa naa                                                  |

### Plugins

Plugins can be installed in a separate directory and mounted using Docker or Kubernetes, however make sure you build plugins with native dependencies using the same base image as the Verdaccio Dockerfile.

```docker
FROM verdaccio/verdaccio

RUN npm install verdaccio-s3-storage
```

### Docker ati iṣeto ibudo akanṣe

Any `host:port` configured in `conf/config.yaml` under `listen` **is currently ignored when using docker**.

If you want to reach Verdaccio docker instance under different port, lets say `5000` in your `docker run` command add the environment variable `VERDACCIO_PORT=5000` and then expose the port `-p 5000:5000`.

```bash
V_PATH=/path/for/verdaccio; docker run -it --rm --name verdaccio \
  -e "VERDACCIO_PORT=8080" -p 8080:8080 \  
  verdaccio/verdaccio
```

Of course the numbers you give to `-p` paremeter need to match.

### Lilo HTTPS pẹlu Docker

You can configure the protocol verdaccio is going to listen on, similarly to the port configuration. You have to overwrite the default value("http") of the `PROTOCOL` environment variable to "https", after you specified the certificates in the config.yaml.

```bash
docker run -it --rm --name verdaccio \
  --env "VERDACCIO_PROTOCOL=https" -p 4873:4873
  verdaccio/verdaccio
```

### Lilo docker-compose

1. Gba ẹya tuntun ti [docker-compose](https://github.com/docker/compose).
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

Docker will generate a named volume in which to store persistent application data. You can use `docker inspect` or `docker volume inspect` to reveal the physical location of the volume and edit the configuration, such as:

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

There is also an npm script for building the docker image, so you can also do:

```bash
yarn run build:docker
```

Note: The first build takes some minutes to build because it needs to run `npm install`, and it will take that long again whenever you change any file that is not listed in `.dockerignore`.

Please note that for any of the above docker commands you need to have docker installed on your machine and the docker executable should be available on your `$PATH`.

## Docker Examples

There is a separate repository that hosts multiple configurations to compose Docker images with `verdaccio`, for instance, as reverse proxy:

<https://github.com/verdaccio/docker-examples>

## Docker Custom Builds

> If you have made an image based on Verdaccio, feel free to add it to this list.

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