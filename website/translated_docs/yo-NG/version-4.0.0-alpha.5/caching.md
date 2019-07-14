---
id: version-4.0.0-alpha.5-ifisapo iranti
title: Awọn ọna ifisapo iranti
original_id: ifisapo iranti
---

Verdaccio n se ipamọ gbogbo awọn akopọ ni atilẹwa sinu foda `/storage`. Ṣugbọn o le se ipinnu boya o fẹ tẹle ọna ti o yatọ. Lilo awọn ohun elo o le lo ipamọ ayelujara tabi eyikeyi iru ibi ipamọ data.

## Awọn iṣẹlẹ ifisapo iranti

* Sise agbedide iṣẹ akanṣe Node.js lori awọn olupese **Imuṣiṣẹpọ Alainidaduro** (Bamboo, GitLab, Jenkins, abbl) le jẹ iṣẹ to ma gba akoko pupọ ni ọjọ kan, nitorina, olupese naa yoo gba awọn tọọnu ti tarballs lati ibi iforukọsilẹ ni gbogbo igba ti o ba waye. Bi ti gbogbo igba, awọn irinṣẹ CI n pa ibi iranti rẹ lẹhin agbedide kọọkan atipe ilana naa yoo pada bẹrẹ lati ibẹrẹ pẹpẹ lẹẹkansi. Eyi jẹ ibudanu ti itankanlẹ atipe o n mu adinku abẹwo to n ti ita wa. **O le lo Verdaccio fun ibi iranti tarballs ati metadata ninu nẹtiwọki abẹle wa ki o si mu igbelarugẹ ba akoko agbedide rẹ.**
* **Latẹnsi ati Asopọ**, ko kin ṣe gbogbo orilẹ-ede ni o n jẹ igbadun isopọ to yara gidi gan. Fun iru idi yii awọn akopọ ibi iranti ti ibilẹ ninu nẹtiwọki rẹ jẹ eyi to wulo gan. Boya ti o ba wa ni irin-ajo, tabi o ni asopọ alailagbara, ilọkiri tabi awọn orilẹ-ede ti o ni awọn aabo ayelujara ti o lagbara ti o le ni ipa lori iriri olumulo (fun apẹẹrẹ: tarballs bibajẹ).
* **Ipo Aisilorila**, gbogbo Awọn alakoso Akopọ Oju ipade ni ode oni n lo ibi iranti abẹle ti ara wọn, ṣugbọn o wọpọ ki awọn iṣẹ akanṣe ọtọọtọ maa lo awọn irinṣẹ ọtọọtọ, eyi ti o tumọ si awọn faili atipa ati bẹẹbẹẹ lọ. Awọn irinṣẹ yẹn ko ni anfani lati pin ibi iranti, ojutu to dayatọ naa jẹ eyi to wa lojukan atipe o gbẹkele ibi iforukọsilẹ aṣoju ikọkọ, Verdaccio n se ipamọ gbogbo awọn metadata ati awọn tarballs n jẹ gbigba lati ayelujara nipa ibeere nini anfani lati pin wọn kaakiri gbogbo isẹ rẹ.
* Yago fun pe ki eyikeyi ibi iforukọsilẹ latọna jijin pada lojiji *HTTP 404 * aṣiṣe fun tarballs ni tẹlẹtẹlẹ wa a.k.a ([left-pad issue](https://www.theregister.co.uk/2016/03/23/npm_left_pad_chaos/)).

# Awọn ọna fun ṣiṣe awọn agbedide kiakia

> A n wa awọn ọna diẹ sii, ma se siyemeji lati pin iriri rẹ ni aaye yii

## Yago fun Fifi tarballs sapo iranti

Ti o ba ni aaye ibi ipamọ ti o lopin, o le nilo lati yago fun titọju tarballs, siseto `cache` false ninu uplink kọọkan ma ṣe ipamọ iranti awọn faili metadata nikan.

    uplinks:
      npmjs:
        url: https://registry.npmjs.org/
        cache: false
    

## Fifa Akoko Ipari Apo iranti gun

Verdaccio ni atilẹwa ma n duro fun iṣẹju meji lati fagilee awọn metadata apo iranti ki o to sawari alaye tuntun lati ibi iforukọsilẹ ọlọna jijin.

```yaml
uplinks:
  npmjs:
    url: https://registry.npmjs.org/
    maxage: 30m
```

Sise alekun iye ti `maxage` ninu awọn idari `uplink` kọọkan maa jẹ bibeere nigbagbogbo. Eyi le jẹ ilana to fẹsẹmulẹ ti o ko ba maa ṣe imudojuiwọn awọn agbẹkẹle nigbagbogbo.

## Lilo iranti dipo lilo ààyè ìtọ́jú lórí kọ̀mpútà

Sometimes caching packages is not a critical step, rather than route packages from different registries and achiving faster build times. Awọn ohun elo afikun meji wa to yago patapata fun kikọ sinu ààyè ìtọ́jú alafojuri ti kọ̀mpútà nipa lilo iranti.

```bash
  npm install -g verdaccio-auth-memory
  npm install -g verdaccio-memory
```

Iṣeto naa ribi iru eyi

```yaml
auth:
  auth-memory:
    users:
      foo:
        name: test
        password: test
store:
  memory:
    limit: 1000
```

Ranti, ni kete ti olupese naa ba ti jẹ atunbẹrẹ ipadanu data naa ti n waye, a ṣe igbaniyanju iṣeto yii ni awọn aaye ti o ko ba ti nilo lati ṣe atẹnumọ.