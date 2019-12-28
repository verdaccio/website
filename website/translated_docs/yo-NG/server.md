---
id: iṣeto-olupese
title: "Iṣeto Olupese"
---

Eyi jẹ ohun ipilẹ iṣeto olupese ti linux ṣugbọn mo lero pe o ṣe pataki lati ṣe akosile ati pin awọn igbesẹ ti mo gbe lati mu ki verdaccio ma ṣiṣẹ titilailai lori olupese mi. O ma nilo awọn igbanilaaye ipile (tabi sudo) fun awọn wọnyii.

<div id="codefund">''</div>

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

## Mimu verdaccio ṣiṣẹ titilailai

O le lo akopọ oju ipade ti a n pe ni ['forever'](https://github.com/nodejitsu/forever) lati mu ki verdaccio ma ṣiṣẹ ni gbogbo igba.

Kọkọ fi `forever` sori ẹrọ kaakiri agbaye:

```bash
$ sudo npm install -g forever
```

Rii daju pe o ti ṣe imuṣiṣẹ verdaccio ni o kere ju lẹẹkan lati ṣe ipilẹsẹ faili iṣeto ati ki o si kọ olumulo alakoso ti o jẹ ṣiṣẹda silẹ. O le wa lo awọn aṣẹ wọnyi lati bẹrẹ verdaccio:

```bash
$ forever start `which verdaccio`
```

O le ṣayẹwo awọn iwe akọsilẹ fun alaye diẹ sii lori bi o ṣe le lo forever.

## Olupese ti o ye ti n bẹrẹ lẹẹkansi

O le lo `crontab` ati `forever` papọ lati bẹrẹ verdaccio lẹhin atunbẹrẹ olupese. Nigba ti o ba wọle gẹgẹbi olumulo verdaccio naa ṣe awọn wọnyii:

```bash
$ crontab -e
```

Eyi le beere lọwọ rẹ lati yan olusatunkọ kan. Mu ayanfẹ rẹ ki o si tẹsiwaju. Se afikun awọn atẹwọle wọnyii si faili naa:

    @reboot /usr/bin/forever start /usr/lib/node_modules/verdaccio/bin/verdaccio
    

Awọn ipo le yatọ si dida lori iṣeto olupese rẹ. Ti o ba fẹ lati mọ ibi ti awọn faili rẹ wa o le lo aṣẹ 'which':

```bash
$ which forever
$ which verdaccio
```

## Lilo systemd

Dipo `forever` o le lo `systemd` fun bibẹrẹ verdaccio ati mi ma mu ṣiṣẹ lọ. Fifi Verdaccio sori ẹrọ ni ẹya systemd, o kan nilo lati se adaakọ rẹ ni:

```bash
$ sudo cp /usr/lib/node_modules/verdaccio/systemd/verdaccio.service /lib/systemd/system/ && sudo systemctl daemon-reload
```

Ẹya yii gba wipe o ni iṣeto ni `/etc/verdaccio/config.yaml` ati tọju data ni `/var/lib/verdaccio`, nitorina boya ki o gbe awọn faili rẹ lọ si awọn aaye yẹn tabi satunkọ ẹya naa.