---
id: iṣeto-olupese
title: "Iṣeto Olupese"
---

Eyi jẹ ohun ipilẹ iṣeto olupese ti linux ṣugbọn mo lero pe o ṣe pataki lati ṣe akosile ati pin awọn igbesẹ ti mo gbe lati mu ki verdaccio ma ṣiṣẹ titilailai lori olupese mi. O ma nilo awọn igbanilaaye ipile (tabi sudo) fun awọn wọnyii.

## Nṣiṣẹ gẹgẹbi olumulo ti o yatọ

Kọkọ ṣẹda olumulo verdaccio naa:

```bash
$ sudo adduser --system --gecos 'Verdaccio NPM mirror' --group --home /var/lib/verdaccio verdaccio
```

Tabi, toba sẹlẹ pe o ko ni `adduser`:

```bash
$ sudo useradd --system --comment 'Verdaccio NPM mirror' --create-home --home-dir /var/lib/verdaccio --shell /sbin/nologin verdaccio
```

O ṣẹda ikarahun gẹgẹbi olumulo verdaccio nipa lilo aṣẹ wọnyi:

```bash
$ sudo su -s /bin/bash verdaccio
$ cd
```

Aṣẹ `cd` n rán ẹ lọ si itọsọna ile ti olumulo verdaccio naa. Rii daju pe o mu verdaccio ṣiṣẹ ni o kere ju lẹẹkan lati ṣe ipilẹṣẹ faili iṣeto naa. Ṣatunkọ rẹ ni ibaamu pẹlu awọn inilo rẹ.

## Gbigbọ lori gbogbo awọn adirẹsi

Ti o ba fẹ lati tẹtisi gbogbo adirẹsi itagbangba ṣeto ilana igbọran ninu iṣeto naa lati:

```yaml
# o le se adirẹsi itẹtisi ni pato (tabi ibudo kan nìkan)
gbọ: 0.0.0.0:4873
```

Ti o ba n mu verdaccio ṣiṣẹ ninu Ilana Amazon EC2 kan, [o ma nilo lati ṣeto itẹtisi naa ni aaye ayipada faili iṣeto rẹ](https://github.com/verdaccio/verdaccio/issues/314#issuecomment-327852203) bi a ti salaye loke.

> Ṣeto Apache tabi nginx? Jọwọ ṣabẹwo [Iseto Aṣoju ikọkọ Alayipada](reverse-proxy.md)

## Keeping verdaccio running forever

You can use node package called ['forever'](https://github.com/nodejitsu/forever) to keep verdaccio running all the time.

First install `forever` globally:

```bash
$ sudo npm install -g forever
```

Make sure you've run verdaccio at least once to generate the config file and write down the created admin user. You can then use the following command to start verdaccio:

```bash
$ forever start `which verdaccio`
```

You can check the documentation for more information on how to use forever.

## Surviving server restarts

You can use `crontab` and `forever` together to start verdaccio after a server reboot. When you're logged in as the verdaccio user do the following:

```bash
$ crontab -e
```

This might ask you to choose an editor. Pick your favorite and proceed. Add the following entry to the file:

    @reboot /usr/bin/forever start /usr/lib/node_modules/verdaccio/bin/verdaccio
    

The locations may vary depending on your server setup. If you want to know where your files are you can use the 'which' command:

```bash
$ which forever
$ which verdaccio
```

## Using systemd

Instead of `forever` you can use `systemd` for starting verdaccio and keeping it running. Verdaccio installation has systemd unit, you only need to copy it:

```bash
$ sudo cp /usr/lib/node_modules/verdaccio/systemd/verdaccio.service /lib/systemd/system/ && sudo systemctl daemon-reload
```

This unit assumes you have configuration in `/etc/verdaccio/config.yaml` and store data in `/var/lib/verdaccio`, so either move your files to those locations or edit the unit.