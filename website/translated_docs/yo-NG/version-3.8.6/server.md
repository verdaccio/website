---
id: version-3.8.6-iṣeto-olupese
title: Iṣeto Olupese
original_id: iṣeto-olupese
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

The `cd` command sends you to the home directory of the verdaccio user. Make sure you run verdaccio at least once to generate the config file. Edit it according to your needs.

## Gbigbọ lori gbogbo awọn adirẹsi

Ti o ba fẹ lati tẹtisi gbogbo adirẹsi itagbangba ṣeto ilana igbọran ninu iṣeto naa lati:

```yaml
# o le se adirẹsi itẹtisi ni pato (tabi ibudo kan nìkan)
gbọ: 0.0.0.0:4873
```

Ti o ba n mu verdaccio ṣiṣẹ ninu Ilana Amazon EC2 kan, [o ma nilo lati ṣeto itẹtisi naa ni aaye ayipada faili iṣeto rẹ](https://github.com/verdaccio/verdaccio/issues/314#issuecomment-327852203) bi a ti salaye loke.

> Configure Apache or nginx? Please check out the [Reverse Proxy Setup](reverse-proxy.md)

## Mimu verdaccio ṣiṣẹ titilailai

O le lo akopọ oju ipade ti a n pe ni ['forever'](https://github.com/nodejitsu/forever) lati mu ki verdaccio ma ṣiṣẹ ni gbogbo igba.

Kọkọ fi `forever` sori ẹrọ kaakiri agbaye:

```bash
$ sudo npm install -g forever
```

Make sure you've run verdaccio at least once to generate the config file and write down the created admin user. You can then use the following command to start verdaccio:

```bash
$ forever start `which verdaccio`
```

O le ṣayẹwo awọn iwe akọsilẹ fun alaye diẹ sii lori bi o ṣe le lo forever.

## Olupese ti o ye ti n bẹrẹ lẹẹkansi

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

## Lilo systemd

Instead of `forever` you can use `systemd` for starting verdaccio and keeping it running. Verdaccio installation has systemd unit, you only need to copy it:

```bash
$ sudo cp /usr/lib/node_modules/verdaccio/systemd/verdaccio.service /lib/systemd/system/ && sudo systemctl daemon-reload
```

Ẹya yii gba wipe o ni iṣeto ni `/etc/verdaccio/config.yaml` ati tọju data ni `/var/lib/verdaccio`, nitorina boya ki o gbe awọn faili rẹ lọ si awọn aaye yẹn tabi satunkọ ẹya naa.