---
id: version-3.8.6-docker
title: Docker
original_id: docker
---

<div class="docker-count">
  ![alt Docker Pulls Count](http://dockeri.co/image/verdaccio/verdaccio "Docker Pulls Count")
</div>

Lati fa [aworan docker](https://hub.docker.com/r/verdaccio/verdaccio/) tuntun to ti jẹ kikọ siwaju:

```bash
docker pull verdaccio/verdaccio
```

![Docker pull](/svg/docker_verdaccio.gif)

## Awọn ẹya to ni Isamisi

Lati ẹya `v2.x` o le fa awọn aworan docker nipasẹ [aami](https://hub.docker.com/r/verdaccio/verdaccio/tags/), bi iwọnyi:

Fun ẹya pataki kan:

```bash
docker pull verdaccio/verdaccio:3
```

Fun ẹya kekere kan:

```bash
docker pull verdaccio/verdaccio:3.0
```

Fun ẹya (awẹ) kan pato:

```bash
docker pull verdaccio/verdaccio:3.0.1
```

Fun ifilọlẹ gboogi tokan nipa lilo ẹya `beta` (ẹka ọga).

```bash
docker pull verdaccio/verdaccio:beta
```

> Ti o ba nifẹsi akojọ lori awọn aami, [jọwọ lọ si aaye ayelujara ti Docker Hub](https://hub.docker.com/r/verdaccio/verdaccio/tags/).

## Mimu verdaccio ṣiṣẹ nipa lilo Docker

Lati mu apoti docker ṣiṣẹ:

```bash
docker run -it --rm --name verdaccio -p 4873:4873 verdaccio/verdaccio
```

Ariyanjiyan ikẹhin n sọ iru aworan to ma jẹ lilo. Ila to wa loke yoo fa aworan tuntun ti o ti wa ni kikọ tẹlẹ lati dockerhub, ti o ko ba ti ṣe bẹ tẹlẹ.

Ti o ba ti [kọ aworan kan ni ilana ibilẹ](#build-your-own-docker-image) lo `verdaccio` gẹgẹbi ariyanjiyan ikẹhin.

O le lo `-v` lati de atopọ `conf`, `storage` ati `plugins` mọ eto faili ti olugbalejo naa:

```bash
V_PATH=/path/for/verdaccio; docker run -it --rm --name verdaccio -p 4873:4873 \
  -v $V_PATH/conf:/verdaccio/conf \
  -v $V_PATH/storage:/verdaccio/storage \
  -v $V_PATH/plugins:/verdaccio/plugins \
  verdaccio/verdaccio
```

> Akiyesi: Verdaccio n ṣiṣẹ bi olumulo ti ko lo gbongbo (uid=100, gid=101) ninu apoti naa, ti o ba lo atopọ dide lati fagbara bori atilẹwa, o nilo lati rii daju pe ọna atilẹyin naa jẹ pinpin si olumulo to tọ. Ninu apẹẹrẹ ti o wa loke, o nilo lati ṣamulo `sudo chown -R 100:101 /opt/verdaccio` bibẹkọ o ma salaba pade awọn aṣiṣe igbanilaaye ni akoko iṣiṣẹ. [Lo iwọn iye docker](https://docs.docker.com/storage/volumes/) o jẹ igbaniyanju lori lilo atopọ dide.

### Awọn ohun elo

Awọn ohun elo afikun le ṣee fi sori ọna to yatọ ati jẹ titopọ nipa lilo Docker tabi Kubernetes, amọṣa rii daju pe o kọ awọn ohun elo afikun pẹlu awọn igbarale abinibi nipa lilo aworan ipilẹ kanna bi ti Verdaccio Dockerfile.

### Docker ati iṣeto ibudo akanṣe

Eyikeyi `host:port` to jẹ ṣiṣeto ni `conf/config.yaml` labẹ `listen` n lọwọlọwọ jẹ fifojufo nigbati docker ba n jẹ lilo.

Ti o ba fẹ lati kansi isẹlẹ docker verdaccio labẹ ibudo to yatọ, jẹ ki a sọpe `5000` ninu `docker run` rẹ rọpo aṣẹ `-p 4873:4873` pẹlu `-p 5000:4873`.

Toba sẹlẹ pe o nilo lati sọ pato ibudo to yẹ lati tẹtisi **ninu apoti docker naa**, lati ẹya 2.?.? o le ṣe bẹ nipa pipese afikun awọn ariyanjiyan si `docker run`: `--env PORT=5000` Eleyi n ṣe ayipada ibudo eyi ti apoti docker naa n laju si ati ibudo ti verdaccio n tẹtisi.

Dajudaju awọn nọmba ti o fi fun `-p` odiwọn nilo lati baramu, nitorina kani wipe o fẹ ki gbogbo wọn jẹ ikannaa eyi ni ohun ti o le dakọ, lẹẹmọ ati samulo:

```bash
PORT=5000; docker run -it --rm --name verdaccio \
  --env PORT -p $PORT:$PORT
  verdaccio/verdaccio
```

### Lilo HTTPS pẹlu Docker

O le ṣe iṣeto awọn ilana ti verdaccio yoo tẹtisi, ni ibaramu si iṣeto ti ibudo naa. O ni lati satunkọ iye atilẹwa("http") ti `PROTOCOL` iyipada ayika si "https", lẹhin ti o ti sọ awọn iwe ẹri inu config.yaml ni pato.

```bash
PROTOCOL=https; docker run -it --rm --name verdaccio \
  --env PROTOCOL -p 4873:4873
  verdaccio/verdaccio
```

### Lilo docker-compose

1. Gba ẹya tuntun ti [docker-compose](https://github.com/docker/compose).
2. Sagbedide ati ṣe imuṣiṣẹ apoti naa:

```bash
$ docker-compose up --build
```

O le ṣeto ibudo naa lati lo (fun awọn apoti ati agbalejo) nipasẹ fifi awọn aṣẹ ti o wa loke yii saaju pẹlu `PORT=5000`.

Docker ma pilẹṣẹ iye iwọn to ni orukọ inu eyi ti data ohun elo alatẹnumọ ma jẹ fifipamọ sii. O le lo `docker inspect` tabi `docker volume inspect` lati safihan ipo afojuri ti iye iwọn naa ati ṣatunkọ iṣeto naa, bii ti:

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
    
    

## Sagbedide aworan Docker ti ara rẹ

```bash
docker build -t verdaccio .
```

Iwe afọwọkọ npm kan naa tun wa fun kikọ aworan docker naa, nitorina o tun le ṣe:

```bash
npm run build:docker
```

Akiyesi: Agbedide akọkọ n gba iṣẹju diẹ lati jẹ kikọ nitori pe o nilo lati samulo iṣẹ `npm install`, atipe o ma pẹ to bayii lẹẹkansi nigbakugba to ba sayipada eyikeyi faili ti ko ba si lori akojọ ti `.dockerignore`.

Ti o ba fẹ lo aworan docker naa lori rpi kan tabi ẹrọ kan to ni ibamu dockerfile kan na tun wa. Lati kọ aworan docker naa fun raspberry pi ṣe abayọri:

```bash
npm run build:docker:rpi
```

Jọwọ kiyesi pe fun eyikeyi ninu awọn asẹ docker to wa loke yii o nilo lati ni docker lori ẹrọ rẹ atipe awọn iṣẹ ṣiṣe docker naa gbọdọ wa lori `$PATH`.

## Awọn apẹẹrẹ Docker

Ibi ipamọ kan to dayatọ wa ti o n gbalejo ọpọlọpọ awọn iṣeto lati kọ awọn aworan Docker pẹlu `verdaccio`, fun apẹẹrẹ, bi aṣoju ikọkọ alayipada:

<https://github.com/verdaccio/docker-examples>

## Awọn agbedide Akanṣe ti Docker

* [docker-verdaccio-gitlab](https://github.com/snics/docker-verdaccio-gitlab)
* [docker-verdaccio](https://github.com/deployable/docker-verdaccio)
* [docker-verdaccio-s3](https://github.com/asynchrony/docker-verdaccio-s3) Apoti NPM aladani ti o le ṣe atilẹyin de s3
* [docker-verdaccio-ldap](https://github.com/snadn/docker-verdaccio-ldap)
* [verdaccio-ldap](https://github.com/nathantreid/verdaccio-ldap)
* [verdaccio-compose-local-bridge](https://github.com/shingtoli/verdaccio-compose-local-bridge)
* [docker-verdaccio](https://github.com/Global-Solutions/docker-verdaccio)
* [verdaccio-docker](https://github.com/idahobean/verdaccio-docker)
* [verdaccio-server](https://github.com/andru255/verdaccio-server)
* [coldrye-debian-verdaccio](https://github.com/coldrye-docker/coldrye-debian-verdaccio) aworan docker to n pese verdaccio lati coldrye-debian-nodejs.