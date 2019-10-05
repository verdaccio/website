---
id: version-4.0.0-beta.8-docker
title: Docker
original_id: docker
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

> La configurazione seguente è basata su Verdaccio 4 o sul `4.x-next` tag.

Per avviare il contenitore Docker:

```bash
docker run -it --rm --name verdaccio -p 4873:4873 verdaccio/verdaccio:4.x-next
```

L'ultimo argomento definisce quale immagine utilizzare. La riga precedente recupererà l'ultima immagine pre costruita da dockerhub, se non è già stato fatto.

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

> Nota: Verdaccio viene eseguito all'interno del container come utente non-root (uid=10001), se si utilizza bind mount per sovrascrivere le impostazioni predefinite, è necessario assicurarsi che la mount directory venga assegnata all'utente corretto. Nell'esempio precedente, è necessario eseguire `sudo chown -R 10001:65533 /opt/verdaccio` altrimenti si presenteranno errori di autorizzazione durante l'esecuzione. Si consiglia di [utilizzare il volume di docker](https://docs.docker.com/storage/volumes/) al posto di bind mount.

Verdaccio 4 fornisce un nuovo set di variabili d'ambiente per modificare le autorizzazioni, la porta o il protocollo http. Qui l'elenco completo:

| Proprietà             | default                | Descrizione                                                           |
| --------------------- | ---------------------- | --------------------------------------------------------------------- |
| VERDACCIO_APPDIR      | `/opt/verdaccio-build` | la directory di lavoro docker                                         |
| VERDACCIO_USER_NAME | `verdaccio`            | l'utente del sistema                                                  |
| VERDACCIO_USER_UID  | `10001`                | l'id utente utilizzato per applicare le autorizzazioni della cartella |
| VERDACCIO_PORT        | `4873`                 | la porta di verdaccio                                                 |
| VERDACCIO_PROTOCOL    | `http`                 | il protocollo http predefinito                                        |

### Plugin

I plugin possono essere installati in una cartella separata e montati utilizzando Docker o Kubernetes, ad ogni modo assicurarsi di costruire plugin con dipendenze native adoperando la stessa immagine di base del Dockerfile di Verdaccio.

```docker
FROM verdaccio/verdaccio

RUN npm install verdaccio-s3-storage
```

### Configurazione di Docker e della porta personalizzata

Qualsiasi `host:port` configurato in `conf/config.yaml` sotto a `listen` **viene attualmente ignorato quando si utilizza docker**.

Se si desidera raggiungere l'istanza docker di Verdaccio da una porta differente, diciamo `5000`, nel comando `docker run` aggiungere la variabile d'ambiente `VERDACCIO_PORT=5000` e poi esporre la porta `-p 5000:5000`.

```bash
V_PATH=/path/for/verdaccio; docker run -it --rm --name verdaccio \
  -e "VERDACCIO_PORT=8080" -p 8080:8080 \  
  verdaccio/verdaccio:4.x-next
```

Naturalmente il numero che viene dato al parametro `-p` deve corrispondere.

### Utilizzare HTTPS con Docker

È possibile configurare il protocollo che verdaccio andrà ad ascoltare, analogamente a come si configura la porta. È necessario sovrascrivere il valore predefinito ("http") della variabile ambientale del `PROTOCOL` con "https", dopo aver specificato i certificati nel config.yaml.

```bash
docker run -it --rm --name verdaccio \
  --env "VERDACCIO_PROTOCOL=https" -p 4873:4873
  verdaccio/verdaccio:4.x-next
```

### Utilizzare docker-compose

1. Scaricare l'ultima versione di [docker-compose](https://github.com/docker/compose).
2. Creare ed eseguire il container:

```bash
$ docker-compose up --build
```

Si può definire la porta da utilizzare (sia per il container che per l'host) anteponendo al comando precedente il prefisso `VERDACCIO_PORT=5000`.

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

## Build Personalizzate di Docker

> Se hai creato un'immagine basata su Verdaccio, aggiungila a questo elenco.

* [docker-verdaccio-gitlab](https://github.com/snics/docker-verdaccio-gitlab)
* [docker-verdaccio](https://github.com/deployable/docker-verdaccio)
* [docker-verdaccio-s3](https://github.com/asynchrony/docker-verdaccio-s3) Container privato di NPM che può eseguire il back up in s3
* [docker-verdaccio-ldap](https://github.com/snadn/docker-verdaccio-ldap)
* [verdaccio-ldap](https://github.com/nathantreid/verdaccio-ldap)
* [verdaccio-compose-local-bridge](https://github.com/shingtoli/verdaccio-compose-local-bridge)
* [docker-verdaccio](https://github.com/Global-Solutions/docker-verdaccio)
* [verdaccio-docker](https://github.com/idahobean/verdaccio-docker)
* [verdaccio-server](https://github.com/andru255/verdaccio-server)
* [coldrye-debian-verdaccio](https://github.com/coldrye-docker/coldrye-debian-verdaccio) immagine docker che fornisce verdaccio da coldrye-debian-nodejs.