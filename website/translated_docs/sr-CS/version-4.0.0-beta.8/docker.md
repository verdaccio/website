---
id: version-4.0.0-beta.8-docker
title: Docker
original_id: docker
---

![alt Docker Pulls Count](https://dockeri.co/image/verdaccio/verdaccio "Docker Pulls Count")

Kako biste povukli (pull) najnoviji pre-built [docker image](https://hub.docker.com/r/verdaccio/verdaccio/):

```bash
docker pull verdaccio/verdaccio
```

![Docker pull](assets/docker_verdaccio.gif)

<div id="codefund">''</div>

## Tagged Versions

Počevši od verzije `v2.x` možete povući docker images preko [tag](https://hub.docker.com/r/verdaccio/verdaccio/tags/), i onda:

Za glavne verzije:

```bash
docker pull verdaccio/verdaccio:3
```

Za podverzije:

```bash
docker pull verdaccio/verdaccio:3.0
```

Za specifičnu verziju (patch):

```bash
docker pull verdaccio/verdaccio:3.0.1
```

For the next major release using the `4.x-next` (master) version.

```bash
docker pull verdaccio/verdaccio:4.x-next
```

> Ako Vas zanima lista tagova, [posetite Docker Hub website](https://hub.docker.com/r/verdaccio/verdaccio/tags/).

## Running Verdaccio using Docker

> The following configuration is based on the Verdaccio 4 or the `4.x-next` tag.

Kako biste pokrenuli docker container:

```bash
docker run -it --rm --name verdaccio -p 4873:4873 verdaccio/verdaccio:4.x-next
```

Poslednji argument definiše koji će image biti korišćen. Linija navedena u primeru povlači poslednji prebuilt image sa dockerhub-a, ako to već niste uradili.

Ako imate [build an image locally](#build-your-own-docker-image) koristite `verdaccio` kao poslednji argument.

Možete koristiti `-v` kako biste vezali (bind) mount `conf`, `storage` i `plugins` za hosts filesystem:

```bash
V_PATH=/path/for/verdaccio; docker run -it --rm --name verdaccio \
  -p 4873:4873 \
  -v $V_PATH/conf:/verdaccio/conf \
  -v $V_PATH/storage:/verdaccio/storage \
  -v $V_PATH/plugins:/verdaccio/plugins \
  verdaccio/verdaccio:4.x-next
```

> Note: Verdaccio runs as a non-root user (uid=10001) inside the container, if you use bind mount to override default, you need to make sure the mount directory is assigned to the right user. In above example, you need to run `sudo chown -R 100:101 /opt/verdaccio` otherwise you will get permission errors at runtime. [Use docker volume](https://docs.docker.com/storage/volumes/) je preporučeno umesto korišćenja bind mount.

Verdaccio 4 provides a new set of environment variables to modify either permissions, port or http protocol. Here the complete list:

| Svojstvo              | default                | Opis                                               |
| --------------------- | ---------------------- | -------------------------------------------------- |
| VERDACCIO_APPDIR      | `/opt/verdaccio-build` | the docker working directory                       |
| VERDACCIO_USER_NAME | `verdaccio`            | the system user                                    |
| VERDACCIO_USER_UID  | `10001`                | the user id being used to apply folder permissions |
| VERDACCIO_PORT        | `4873`                 | the verdaccio port                                 |
| VERDACCIO_PROTOCOL    | `http`                 | the default http protocol                          |

### Plugins

Plugins se mogu instalirati u posebnom direktorijumu i mountovati korišćenjem Docker-a ili Kubernetes. Ipak, postarajte se da "build" plugins sa native dependencies korišćenjem iste base image kao Verdaccio Dockerfile-a.

```docker
FROM verdaccio/verdaccio

RUN npm install verdaccio-s3-storage
```

### Docker i custom port konfiguracija

Any `host:port` configured in `conf/config.yaml` under `listen` **is currently ignored when using docker**.

If you want to reach Verdaccio docker instance under different port, lets say `5000` in your `docker run` command add the environment variable `VERDACCIO_PORT=5000` and then expose the port `-p 5000:5000`.

```bash
V_PATH=/path/for/verdaccio; docker run -it --rm --name verdaccio \
  -e "VERDACCIO_PORT=8080" -p 8080:8080 \  
  verdaccio/verdaccio:4.x-next
```

Of course the numbers you give to `-p` paremeter need to match.

### Korišćenje HTTPS sa Docker-om

Možete konfigurisati protokol koji će verdaccio slušati (listen on) i to na sličan način kao što ste podesili port configuration. Potrebno je da zamenite zadatu vrednost("http") u `PROTOCOL` environment variabl-i sa "https",nakon što ste odredili sertifikate u config.yaml.

```bash
docker run -it --rm --name verdaccio \
  --env "VERDACCIO_PROTOCOL=https" -p 4873:4873
  verdaccio/verdaccio:4.x-next
```

### Korišćenje docker-compose

1. Nabavite poslednju verziju [docker-compose](https://github.com/docker/compose).
2. Build i pokrenite kontejner:

```bash
$ docker-compose up --build
```

You can set the port to use (for both container and host) by prefixing the above command with `VERDACCIO_PORT=5000`.

```yaml
version: '3.1'

services:
  verdaccio:
    image: verdaccio/verdaccio:4.x-next
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
      - "./config:/verdaccio/conf"  
networks:
  node-network:
    driver: bridge
```

Docker će napraviti imenovani volume u kome će se čuvati podaci za aplikaciju. Možete koristiti `docker inspect` ili `docker volume inspect` kako biste otkrili fiizičku lokaciju volume-a i izmenili konfiguraciju, na primer:

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

## Napravite svoj sopstveni Docker image

```bash
docker build -t verdaccio .
```

Postoji takođe i npm script za building docker image-a, tako da možete da zadate i ovako:

```bash
yarn run build:docker
```

Napomena: Prvi build može potrajati nekoliko minuta pošto mora da pokrene `npm install`, i ponovo će trajati dugo ako promenite bilo koji fajl koji nije izlistan u `.dockerignore`.

Primite k znanju da za svaku docker komandu morate imati na svojoj mašini instaliran docker zajedno sa docker executable koja mora biti dostupna na `$PATH`.

## Docker Primeri

Postoji zaseban repozitorijum koji hostuje multiple konfiguracije kako bi komponovao Docker images sa `verdaccio`, na primer, reverse proxy:

<https://github.com/verdaccio/docker-examples>

## Docker Custom Builds

> If you have made an image based on Verdaccio, feel free to add it to this list.

* [docker-verdaccio-gitlab](https://github.com/snics/docker-verdaccio-gitlab)
* [docker-verdaccio](https://github.com/deployable/docker-verdaccio)
* [docker-verdaccio-s3](https://github.com/asynchrony/docker-verdaccio-s3) Privatni NPM container koji se može backup-ovati na s3
* [docker-verdaccio-ldap](https://github.com/snadn/docker-verdaccio-ldap)
* [verdaccio-ldap](https://github.com/nathantreid/verdaccio-ldap)
* [verdaccio-compose-local-bridge](https://github.com/shingtoli/verdaccio-compose-local-bridge)
* [docker-verdaccio](https://github.com/Global-Solutions/docker-verdaccio)
* [verdaccio-docker](https://github.com/idahobean/verdaccio-docker)
* [verdaccio-server](https://github.com/andru255/verdaccio-server)
* [coldrye-debian-verdaccio](https://github.com/coldrye-docker/coldrye-debian-verdaccio) docker image omogućava verdaccio iz coldrye-debian-nodejs.