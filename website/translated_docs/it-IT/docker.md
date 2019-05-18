---
id: docker
title: Docker
---

![alt Docker Pulls Count](http://dockeri.co/image/verdaccio/verdaccio "Docker Pulls Count")

Per scaricare la più recente [immagine docker](https://hub.docker.com/r/verdaccio/verdaccio/) pre costruita:

```bash
docker pull verdaccio/verdaccio
```

![Docker pull](assets/docker_verdaccio.gif)

<div id="codefund">''</div>

## Versioni taggate

Dalla versione `v2.x` si possono ottenere immagini docker per [tag](https://hub.docker.com/r/verdaccio/verdaccio/tags/), come segue:

Per una versione maggiore:

```bash
docker pull verdaccio/verdaccio:3
```

Per una versione minore:

```bash
docker pull verdaccio/verdaccio:3.0
```

Per una specifica (patch) versione:

```bash
docker pull verdaccio/verdaccio:3.0.1
```

Per la successiva maggior release che utilizza la versione `4.x-next` (master).

```bash
docker pull verdaccio/verdaccio:4.x-next
```

> Se si è interessati ad un elenco dei tag, [ si prega di visitare il sito Docker Hub](https://hub.docker.com/r/verdaccio/verdaccio/tags/).

## Eseguire Verdaccio utilizzando Docker

> La configurazione seguente è basata su Verdaccio 4 o sul tag `4.x-next`.

Per avviare il contenitore Docker:

```bash
docker run -it --rm --name verdaccio -p 4873:4873 verdaccio/verdaccio:4.x-next
```

The last argument defines which image to use. The above line will pull the latest prebuilt image from dockerhub, if you haven't done that already.

Se è stata [costruita un'immagine localmente](#build-your-own-docker-image) utilizzare `verdaccio` come ultimo argomento.

È possibile utilizzare `-v` per montare `conf`, `storage` e `plugins` nel filesystem degli host:

```bash
V_PATH=/path/for/verdaccio; docker run -it --rm --name verdaccio \
  -p 4873:4873 \
  -v $V_PATH/conf:/verdaccio/conf \
  -v $V_PATH/storage:/verdaccio/storage \
  -v $V_PATH/plugins:/verdaccio/plugins \
  verdaccio/verdaccio:4.x-next
```

> Note: Verdaccio runs as a non-root user (uid=10001) inside the container, if you use bind mount to override default, you need to make sure the mount directory is assigned to the right user. In above example, you need to run `sudo chown -R 100:101 /opt/verdaccio` otherwise you will get permission errors at runtime. Si consiglia di [utilizzare il volume di docker](https://docs.docker.com/storage/volumes/) al posto di bind mount.

Verdaccio 4 provides a new set of environment variables to modify either permissions, port or http protocol. Here the complete list:

| Proprietà             | default                | Descrizione                                        |
| --------------------- | ---------------------- | -------------------------------------------------- |
| VERDACCIO_APPDIR      | `/opt/verdaccio-build` | the docker working directory                       |
| VERDACCIO_USER_NAME | `verdaccio`            | the system user                                    |
| VERDACCIO_USER_UID  | `10001`                | the user id being used to apply folder permissions |
| VERDACCIO_PORT        | `4873`                 | the verdaccio port                                 |
| VERDACCIO_PROTOCOL    | `http`                 | the default http protocol                          |

### Estensioni

I plugin possono essere installati in una cartella separata e montati utilizzando Docker o Kubernetes, ad ogni modo assicurarsi di costruire plugin con dipendenze native adoperando la stessa immagine di base del Dockerfile di Verdaccio.

```docker
FROM verdaccio/verdaccio

RUN npm install verdaccio-s3-storage
```

### Configurazione di Docker e della porta personalizzata

Any `host:port` configured in `conf/config.yaml` under `listen` **is currently ignored when using docker**.

If you want to reach Verdaccio docker instance under different port, lets say `5000` in your `docker run` command add the environment variable `VERDACCIO_PORT=5000` and then expose the port `-p 5000:5000`.

```bash
V_PATH=/path/for/verdaccio; docker run -it --rm --name verdaccio \
  -e "VERDACCIO_PORT=8080" -p 8080:8080 \  
  verdaccio/verdaccio:4.x-next
```

Of course the numbers you give to `-p` paremeter need to match.

### Utilizzare HTTPS con Docker

È possibile configurare il protocollo che verdaccio andrà ad ascoltare, analogamente a come si configura la porta. È necessario sovrascrivere il valore predefinito ("http") della variabile ambientale del `PROTOCOL` con "https", dopo aver specificato i certificati nel config.yaml.

```bash
docker run -it --rm --name verdaccio \
  --env "VERDACCIO_PROTOCOL=https" -p 4873:4873
  verdaccio/verdaccio:4.x-next
```

### Utilizzare docker-compose

1. Scaricare l'ultima versione di [docker-compose](https://github.com/docker/compose).
2. Creare ed eseguire il contenitore:

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

Docker genererà un volume nominato nel quale immagazzinare i dati persistenti dell'applicazione. È possibile utilizzare `docker inspect` o `docker volume inspect` per rivelare l'ubicazione fisica del volume e modificare la configurazione, in questo modo:

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

## Creare la propria immagine Docker

```bash
docker build -t verdaccio .
```

Esiste inoltre uno script npm per creare l'immagine docker, quindi si può anche fare:

```bash
yarn run build:docker
```

Nota: Il primo build necessita di qualche minuto per creare perché ha bisogno di avviare `npm install`, e potrebbe impiegare lo stesso tempo ogni volta che si cambia un file che non sia elencato in `.dockerignore`.

Si prega di notare che per ognuno dei comandi docker sopra citati è necessario avere docker installato sul pc e l'eseguibile docker dovrebbe essere disponibile su `$PATH`.

## Esempi Docker

Esiste una cartella separata che ospita configurazioni multiple per comporre immagini Docker con `verdaccio`, per esempio, come proxy inverso:

<https://github.com/verdaccio/docker-examples>

## Build personalizzati di Docker

> If you have made an image based on Verdaccio, feel free to add it to this list.

* [docker-verdaccio-gitlab](https://github.com/snics/docker-verdaccio-gitlab)
* [docker-verdaccio](https://github.com/deployable/docker-verdaccio)
* [docker-verdaccio-s3](https://github.com/asynchrony/docker-verdaccio-s3) Contenitore privato di NPM che può eseguire il back up in s3
* [docker-verdaccio-ldap](https://github.com/snadn/docker-verdaccio-ldap)
* [verdaccio-ldap](https://github.com/nathantreid/verdaccio-ldap)
* [verdaccio-compose-local-bridge](https://github.com/shingtoli/verdaccio-compose-local-bridge)
* [docker-verdaccio](https://github.com/Global-Solutions/docker-verdaccio)
* [verdaccio-docker](https://github.com/idahobean/verdaccio-docker)
* [verdaccio-server](https://github.com/andru255/verdaccio-server)
* [coldrye-debian-verdaccio](https://github.com/coldrye-docker/coldrye-debian-verdaccio) immagine docker che esegue verdaccio da coldrye-debian-nodejs.