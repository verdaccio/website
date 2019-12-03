---
id: version-4.0.0-alpha.4-docker
title: Docker
original_id: docker
---

<div class="docker-count">
  ![alt Docker Pulls Count](https://dockeri.co/image/verdaccio/verdaccio "Docker Pulls Count")
</div>

To pull the latest pre-built [docker image](https://hub.docker.com/r/verdaccio/verdaccio/):

```bash
docker pull verdaccio/verdaccio
```

![Docker pull](assets/docker_verdaccio.gif)

## Wersje oznaczone

Since version `v2.x` you can pull docker images by [tag](https://hub.docker.com/r/verdaccio/verdaccio/tags/), as follows:

Dla wersji głównej:

```bash
docker pull verdaccio/verdaccio:3
```

Dla wersji drugorzędnej:

```bash
docker pull verdaccio/verdaccio:3.0
```

Dla określonej (poprawka) wersji:

```bash
docker pull verdaccio/verdaccio:3.0.1
```

Do następnej wersji głównej, korzystającej z wersji `beta` (gałąź główna).

```bash
docker pull verdaccio/verdaccio:beta
```

> Jeśli interesuje Cię lista tagów, [odwiedź witrynę Docker Hub](https://hub.docker.com/r/verdaccio/verdaccio/tags/).

## Uruchamianie verdaccio za pomocą Docker'a

Aby uruchomić kontener dokowania:

```bash
docker run -it --rm --name verdaccio -p 4873:4873 verdaccio/verdaccio
```

The last argument defines which image to use. The above line will pull the latest prebuilt image from dockerhub, if you haven't done that already.

Jeśli masz [zbuduj obraz lokalnie](#build-your-own-docker-image), użyj `verdaccio` jako ostatniego argumentu.

Możesz użyć `-v` do związania uchwytu `conf`, `magazynu` i `dodatków` do systemu plików hostów:

```bash
V_PATH=/path/for/verdaccio; docker run -it --rm --name verdaccio -p 4873:4873 \
  -v $V_PATH/conf:/verdaccio/conf \
  -v $V_PATH/storage:/verdaccio/storage \
  -v $V_PATH/plugins:/verdaccio/plugins \
  verdaccio/verdaccio
```

> Uwaga: Verdaccio działa jako użytkownik inny niż root (uid=100, gid=101) wewnątrz kontenera, jeśli używasz wiązania uchwytu do zastąpienia domyślnego, musisz upewnić się, że katalog uchwytu jest przypisany do właściwego użytkownika. W powyższym przykładzie musisz uruchomić `sudo chown -R 100: 101 /opt/verdaccio `, w przeciwnym razie doświadczysz błędów uprawnień w czasie operacji. [Zalecane jest użycie woluminu dokujacego](https://docs.docker.com/storage/volumes/) zamiast używania wiązania uchwytu.

### Wtyczki

Wtyczki mogą być instalowane w oddzielnym katalogu i montowane przy użyciu Docker lub Kubernetes, jednak upewnij się, że budujesz wtyczki z natywnymi zależnościami używając tego samego obrazu podstawowego, co plik Dockerfile Verdaccio.

### Docker and custom port configuration

Any `host:port` configured in `conf/config.yaml` under `listen` is currently ignored when using docker.

Jeśli chcesz dotrzeć do instancji verdaccio docker pod innym portem, powiedzmy `5000` w poleceniu `docker run` zamień `-p 4873:4873` za pomocą `-p 5000:4873`.

W przypadku potrzeby określenia, który port chcesz odsłuchać **w kontenerze docker**, od wersji 2.?.? możesz to zrobić, podając dodatkowe argumenty do`uruchamianie docker`: `--env PORT=5000` To zmienia, który port kontenera docker odsłania i port verdaccio słucha.

Oczywiście, liczby podane do parametru `-p` muszą być zgodne, więc zakładając, że chcesz, aby wszystkie były takie same, możesz skopiować, wkleić i zastosować:

```bash
PORT=5000; docker run -it --rm --name verdaccio \
  --env PORT -p $PORT:$PORT
  verdaccio/verdaccio
```

### Using HTTPS with Docker

Możesz skonfigurować protokół verdaccio, którego verdaccio będzie nasłuchiwał, podobnie jak konfigurację portu. Musisz nadpisać wartość domyślną("http") zmiennej środowiskowej `PROTOCOL` na "https", po określeniu certyfikatów w pliku config.yaml.

```bash
PROTOCOL=https; docker run -it --rm --name verdaccio \
  --env PROTOCOL -p 4873:4873
  verdaccio/verdaccio
```

### Using docker-compose

1. Pobierz najnowszą wersję [docker-compose](https://github.com/docker/compose).
2. Build and run the container:

```bash
$ docker-compose up --build
```

Możesz ustawić port do użycia (zarówno dla kontenera jak i hosta), poprzedzając powyższe polecenie przez `PORT=5000`.

Docker wygeneruje nazwany wolumin, w którym będą przechowywane trwałe dane aplikacji. Możesz użyć`docker inspect` lub `docker volume inspect`, aby odsłonić fizyczną lokalizację woluminu i edytować konfigurację, taką jak:

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
    
    

## Build your own Docker image

```bash
docker build -t verdaccio .
```

Istnieje również skrypt npm do budowania obrazu docker, więc możesz również:

```bash
npm run build:docker
```

Uwaga: Pierwsza kompilacja zajmuje kilka minut, ponieważ wymaga uruchomienia `npm install`, i zajmie to dużo czasu za każdym razem, gdy zmienisz dowolny plik, który nie jest wymieniony w `.dockerignore`.

If you want to use the docker image on a rpi or a compatible device there is also a dockerfile available. To build the docker image for raspberry pi execute:

```bash
npm run build:docker:rpi
```

Please note that for any of the above docker commands you need to have docker installed on your machine and the docker executable should be available on your `$PATH`.

## Docker Examples

Istnieje osobny magazyn, który obsługuje wiele konfiguracji do komponowania obrazów Docker za pomocą `verdaccio`, na przykład jako odwrotnego proxy:

<https://github.com/verdaccio/docker-examples>

## Niestandardowe Kompilacje Docker'a

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