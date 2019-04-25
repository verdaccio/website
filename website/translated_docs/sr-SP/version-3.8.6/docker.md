---
id: version-3.8.6-docker
title: Docker
original_id: docker
---

<div class="docker-count">
  ![alt Docker Pulls Count](http://dockeri.co/image/verdaccio/verdaccio "Docker Pulls Count")
</div>

Како бисте привукли (pull) најновији pre-built [docker image](https://hub.docker.com/r/verdaccio/verdaccio/):

```bash
docker pull verdaccio/verdaccio
```

![Docker pull](/svg/docker_verdaccio.gif)

## Tagged Versions

Почевши од верзије `v2.x` можете повући docker images преко [таг](https://hub.docker.com/r/verdaccio/verdaccio/tags/), и онда:

За главне верзије:

```bash
docker pull verdaccio/verdaccio:3
```

За подверзије:

```bash
docker pull verdaccio/verdaccio:3.0
```

За специфичну верзију (patch):

```bash
docker pull verdaccio/verdaccio:3.0.1
```

За следећу главну верзију `beta` (master branch) верзију.

```bash
docker pull verdaccio/verdaccio:beta
```

> Ако Вас занима листа тагова, [посетите Docker Hub вебсајт](https://hub.docker.com/r/verdaccio/verdaccio/tags/).

## Покретање verdaccio коришћењем Docker-а

Како бисте покренули docker container:

```bash
docker run -it --rm --name verdaccio -p 4873:4873 verdaccio/verdaccio
```

Последњи аргумент дефинише који ће image бити коришћен. Линија наведена у примеру повлачи последњи prebuilt image са dockerhub-а, ако то већ нисте урадили.

Ако употребљавате опцију [build an image locally](#build-your-own-docker-image) користите `verdaccio` као последњи аргумент.

Можете користити `-v` како бисте везали (bind) mount `conf`, `storage` и `plugins` за hosts filesystem:

```bash
V_PATH=/path/for/verdaccio; docker run -it --rm --name verdaccio -p 4873:4873 \
  -v $V_PATH/conf:/verdaccio/conf \
  -v $V_PATH/storage:/verdaccio/storage \
  -v $V_PATH/plugins:/verdaccio/plugins \
  verdaccio/verdaccio
```

> Напомена: Verdaccio ради као non-root user (uid=100, gid=101) унутар container-а. Ако користите bind mount да прегазите задате поставке (override), онда морате да доделите mount directory правом кориснику. У наведеном примеру, морате да покренете `sudo chown -R 100:101 /opt/verdaccio`, у супротном ћете добити permission errors у runtime. [Use docker volume](https://docs.docker.com/storage/volumes/) је препоручено уместо коришћења bind mount.

### Plugins

Plugins се могу инсталирати у посебном директоријуму и моунтовати коришћењем Docker-a Kubernetes. Ипак, постарајте се да "build" plugins са native dependencies коришћењем исте base image као Verdaccio Dockerfile-а.

### Docker и custom порт конфигурација

Сваки `host:port` конфигурисан у `conf/config.yaml` под `listen` се тренутно игнорише док се користи docker.

Ако желите да приступите verdaccio docker инстанци под различитим портом, рецимо `5000`, у Вашој `docker run` команди замените `-p 4873:4873` са `-p 5000:4873`.

У случају да морате да одредите port to listen to **у docker контејнеру**, почевши од верзије 2.?.? то можете учинити тако што ћете унети додатне аргументе у `docker run`: `--env PORT=5000` Ово мења порт који излаже docker контејнер и порт који ће verdaccio слушати (listens to).

Наравно, неопходно је да се бројеви које сте задали као `-p` параметар подударају, тако да ако желите да се све подудара, можете да копирате, залепите и усвојите:

```bash
PORT=5000; docker run -it --rm --name verdaccio \
  --env PORT -p $PORT:$PORT
  verdaccio/verdaccio
```

### Коришћење HTTPS са Docker-ом

Можете конфигурисати протокол који ће verdaccio слушати (listen on) и то на сличан начин као што сте подесили port configuration. Потребно је да замените задату вредност("http") у `PROTOCOL` environment варијабли са "https", након што сте одредили сертификате у config.yaml.

```bash
PROTOCOL=https; docker run -it --rm --name verdaccio \
  --env PROTOCOL -p 4873:4873
  verdaccio/verdaccio
```

### Коришћење docker-compose

1. Набавите последњу верзију [docker-compose](https://github.com/docker/compose).
2. Build и покрените контејнер:

```bash
$ docker-compose up --build
```

Можете подесити порт који ће се употребљавати (и за контејнер и за host) тако што ћете додати префикс `PORT=5000` команди из горњег примера.

Docker ће направити именовани volume у коме ће се чувати подаци за апликацију. Можете користити `docker inspect` или `docker volume inspect` како бисте открили физичку локацију volume-а и изменили конфигурацију, на пример:

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
    
    

## Направите свој сопствени Docker image

```bash
docker build -t verdaccio .
```

Постоји такође и npm script за building docker image-а, тако да можете да задате и овако:

```bash
npm run build:docker
```

Напомена: Први build може потрајати неколико минута пошто мора да покрене `npm install`, и поново ће трајати дуго ако промените било који фајл који није излистан у `.dockerignore`.

Ако желите да користите docker image на rpi или компатибилном уређају, постоји доступни dockerfile. Како бисте направили (build) docker image за Raspberry Pi, извршите:

```bash
npm run build:docker:rpi
```

Примите к знању да за сваку docker команду морате имати на својој машини инсталиран docker заједно са docker executable која мора бити доступна на `$PATH`.

## Docker Примери

Постоји засебан репозиторијум који хостује мултипле конфигурације како би компоновао Docker images са `verdaccio`, на пример, reverse proxy:

<https://github.com/verdaccio/docker-examples>

## Docker Custom Builds

* [docker-verdaccio-gitlab](https://github.com/snics/docker-verdaccio-gitlab)
* [docker-verdaccio](https://github.com/deployable/docker-verdaccio)
* [docker-verdaccio-s3](https://github.com/asynchrony/docker-verdaccio-s3) Приватни NPM контејнер који се може backup-овати на s3
* [docker-verdaccio-ldap](https://github.com/snadn/docker-verdaccio-ldap)
* [verdaccio-ldap](https://github.com/nathantreid/verdaccio-ldap)
* [verdaccio-compose-local-bridge](https://github.com/shingtoli/verdaccio-compose-local-bridge)
* [docker-verdaccio](https://github.com/Global-Solutions/docker-verdaccio)
* [verdaccio-docker](https://github.com/idahobean/verdaccio-docker)
* [verdaccio-server](https://github.com/andru255/verdaccio-server)
* [coldrye-debian-verdaccio](https://github.com/coldrye-docker/coldrye-debian-verdaccio) docker image омогућава verdaccio из coldrye-debian-nodejs.