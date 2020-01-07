---
id: version-4.4.1-server-configuration
title: Server Configuration
original_id: server-configuration
---

Ово је најбазичнија конфигурација за linux server али нам се чини важним да документујемо и поделимо са Вама све кораке како би verdaccio стално радио на серверу. Биће Вам потребне root (или sudo) дозволе за наведено.

<div id="codefund">''</div>

## Покретање, као засебан корисник
Најпре креирајте verdaccio корисника:

```bash
$ sudo adduser --system --gecos 'Verdaccio NPM mirror' --group --home /var/lib/verdaccio verdaccio
```

У случају да немате постојећег корисника потребно је да га додате, `adduser`:

```bash
$ sudo useradd --system --comment 'Verdaccio NPM mirror' --create-home --home-dir /var/lib/verdaccio --shell /sbin/nologin verdaccio
```

Затим креирате shell као verdaccio корисник, путем следеће команде:

```bash
$ sudo su -s /bin/bash verdaccio
$ cd
```

Команда `cd` Вас шаље у home директоријум verdaccio корисника. Проверите да ли сте макар једном покренули verdaccio како бисте генерисали config фајл. И затим га подесите га према својим потребама.

## Listening на свим адресама
Ако желите да ослушкујете (listen to) сваку екстерну адресу, подесите listen директиву на:
```yaml
# можете подесити listen address (или порт)
listen: 0.0.0.0:4873
```

Ако имате покренут verdaccio у Amazon EC2 инстанци, [мораћете да подесите listen у change your config file](https://github.com/verdaccio/verdaccio/issues/314#issuecomment-327852203) као што је приказано у наведеном примеру.

> Желите да конфигуришете Apache или nginx? Погледајте [Reverse Proxy Setup](reverse-proxy.md)

## Како да verdaccio ради непрекидно
Можете да користите node package звани ['forever'](https://github.com/nodejitsu/forever) како бисте имали verdaccio који ће непрекидно радити.

Прво инсталирајте `forever` глобално:
```bash
$ sudo npm install -g forever
```

Требало би да макар једном покренете verdaccio како бисте генерисали config фајл и онда упишете креираног админ корисника. Можете користити наведену команду како бисте покренули verdaccio:

```bash
$ forever start `which verdaccio`
```

Можете погледати документацију за више информација о томе како да користите пакет forever.

## Преживљавање ресетовања сервера
Можете заједно користити `crontab` и `forever` како бисте покренули verdaccio после поновног покретања сервера (reboot). Када сте пријављени као verdaccio корисник, урадите следеће:

```bash
$ crontab -e
```

Можда ћете добити опцију да изаберете едитор. Одаберите свој омиљени и наставите. Додајте наведени унос у фајл:

```
@reboot /usr/bin/forever start /usr/lib/node_modules/verdaccio/bin/verdaccio
```

Локације се могу разликовати у зависности од Ваших подешавања сервера (setup). Ако желите да сазнате где се налазе Ваши фајлови, можете користити команду 'which':

```bash
$ which forever
$ which verdaccio
```

## Коришћење systemd
Уместо `forever` можете користити `systemd` за покретање verdaccio-а и његов даљи рад. Verdaccio instalacija има systemd јединице, потребно је само да их копирате:
```bash
$ sudo cp /usr/lib/node_modules/verdaccio/systemd/verdaccio.service /lib/systemd/system/ && sudo systemctl daemon-reload
```
Ова јединица подразумева да имате конфигурацију у `/etc/verdaccio/config.yaml` и чува податке у `/var/lib/verdaccio`, тако да Вам остаје или да померите своје фајлове или да модификујете саму јединицу.
