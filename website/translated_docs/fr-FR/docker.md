---
id: docker
title: Docker
---

![alt Docker Pulls Count](https://dockeri.co/image/verdaccio/verdaccio "Docker Pulls Count")

Pour télécharger la dernière [image docker](https://hub.docker.com/r/verdaccio/verdaccio/) prédéfinie:

```bash
docker pull verdaccio/verdaccio
```

![Docker pull](assets/docker_verdaccio.gif)

<div id="codefund">''</div>

## Versions marquées

À partir de la version `v2.x`, vous pouvez obtenir des images du menu fixe pour la [tag](https://hub.docker.com/r/verdaccio/verdaccio/tags/), comme suit:

Pour une version majeure:

```bash
docker pull verdaccio/verdaccio:4
```

Pour une version mineure:

```bash
docker pull verdaccio/verdaccio:4.0
```

Pour une version spécifique (patch):

```bash
docker pull verdaccio/verdaccio:4.0.0
```

> Si vous êtes intéréssés par une liste de tags, [veuillez visiter le site web Docker Hub](https://hub.docker.com/r/verdaccio/verdaccio/tags/).

## Running Verdaccio using Docker

Pour exécuter le conteneur de docker:

```bash
docker run -it --rm --name verdaccio -p 4873:4873 verdaccio/verdaccio
```

The last argument defines which image to use. The above line will pull the latest prebuilt image from dockerhub, if you haven't done that already.

Si vous avez [construit une image localement](#build-your-own-docker-image), utilisez `verdaccio` comme dernier argument.

Vous pouvez utiliser `-v` pour monter `conf`, `storage` et `plugins` dans le système de fichiers hôte:

```bash
V_PATH=/path/for/verdaccio; docker run -it --rm --name verdaccio \
  -p 4873:4873 \
  -v $V_PATH/conf:/verdaccio/conf \
  -v $V_PATH/storage:/verdaccio/storage \
  -v $V_PATH/plugins:/verdaccio/plugins \
  verdaccio/verdaccio
```

> Note: Verdaccio runs as a non-root user (uid=10001) inside the container, if you use bind mount to override default, you need to make sure the mount directory is assigned to the right user. In above example, you need to run `sudo chown -R 100:101 /opt/verdaccio` otherwise you will get permission errors at runtime. [Utiliser le volume docker](https://docs.docker.com/storage/volumes/) est recommandé, plutôt qu'utiliser le lieu du montage de liaison.

Verdaccio 4 provides a new set of environment variables to modify either permissions, port or http protocol. Here the complete list:

| Propriété           | default                | Description                                        |
| ------------------- | ---------------------- | -------------------------------------------------- |
| VERDACCIO_APPDIR    | `/opt/verdaccio-build` | the docker working directory                       |
| VERDACCIO_USER_NAME | `verdaccio`            | the system user                                    |
| VERDACCIO_USER_UID  | `10001`                | the user id being used to apply folder permissions |
| VERDACCIO_PORT      | `4873`                 | the verdaccio port                                 |
| VERDACCIO_PROTOCOL  | `http`                 | the default http protocol                          |

### Plugins

Les plugins peuvent être installés dans un dossier séparé et montés à l'aide de Docker ou de Kubernetes. Cependant, veillez à créer des plugins avec des dépendances natives à l'aide de la même image de base du fichier Docker de Verdaccio.

```docker
FROM verdaccio/verdaccio

USER root

ENV NODE_ENV=production

RUN npm i && npm install verdaccio-s3-storage

USER verdaccio
```

### Configuration de Docker et du port personnalisé

Any `host:port` configured in `conf/config.yaml` under `listen` **is currently ignored when using docker**.

If you want to reach Verdaccio docker instance under different port, lets say `5000` in your `docker run` command add the environment variable `VERDACCIO_PORT=5000` and then expose the port `-p 5000:5000`.

```bash
V_PATH=/path/for/verdaccio; docker run -it --rm --name verdaccio \
  -e "VERDACCIO_PORT=8080" -p 8080:8080 \  
  verdaccio/verdaccio
```

Of course the numbers you give to `-p` paremeter need to match.

### Utiliser HTTPS avec Docker

Vous pouvez configurer le protocole que verdaccio écoutera, de la même manière que le port. Vous devez remplacer la valeur par défaut ("http") de la variable d'environnement du `PROTOCOL` par "https" après avoir spécifié les certificats dans le fichier config.yaml.

```bash
docker run -it --rm --name verdaccio \
  --env "VERDACCIO_PROTOCOL=https" -p 4873:4873
  verdaccio/verdaccio
```

### Utiliser docker-compose

1. Obtenir la dernière version de [docker-composer](https://github.com/docker/compose).
2. Générer et exécuter le conteneur:

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

Docker générera un volume nommé dans lequel les données d'application persistantes seront stockées. Vous pouvez utiliser `docker inspect` ou `docker volume inspect` pour révéler l'emplacement physique du volume et modifier la configuration, comme:

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

## Créer votre propre image Docker

```bash
docker build -t verdaccio .
```

Il existe également un script npm pour créer une image docker, vous pouvez donc également:

```bash
yarn run build:docker
```

Remarque: La première génération prend quelques minutes pour être créée car elle doit démarrer `npm install` et peut prendre le même temps chaque fois que vous modifiez un fichier ne figurant pas dans la liste `.dockerignore`.

Veuillez noter que pour chacune des commandes de menu mentionnées ci-dessus, il est nécessaire d’installer le docker sur le PC, aussi le docker exécutable doit être disponible sur `$PATH`.

## Exemples de docker

Il existe un dossier distinct qui héberge plusieurs configurations pour composer des images Docker avec `verdaccio`, par exemple, en tant que proxy inverse:

<https://github.com/verdaccio/docker-examples>

## Constructions personnalisées de Docker

> If you have made an image based on Verdaccio, feel free to add it to this list.

* [docker-verdaccio-gitlab](https://github.com/snics/docker-verdaccio-gitlab)
* [docker-verdaccio](https://github.com/deployable/docker-verdaccio)
* [docker-verdaccio-s3](https://github.com/asynchrony/docker-verdaccio-s3) conteneur privé NPM pouvant être sauvegardé en s3
* [docker-verdaccio-ldap](https://github.com/snadn/docker-verdaccio-ldap)
* [verdaccio-ldap](https://github.com/nathantreid/verdaccio-ldap)
* [verdaccio-compose-local-bridge](https://github.com/shingtoli/verdaccio-compose-local-bridge)
* [docker-verdaccio](https://github.com/Global-Solutions/docker-verdaccio)
* [verdaccio-docker](https://github.com/idahobean/verdaccio-docker)
* [verdaccio-server](https://github.com/andru255/verdaccio-server)
* [coldrye-debian-verdaccio](https://github.com/coldrye-docker/coldrye-debian-verdaccio) image de docker fournissant verdaccio à partir de coldrye-debian-nodejs.