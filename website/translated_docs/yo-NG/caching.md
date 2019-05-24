---
id: ifisapo iranti
title: "Awọn ọna ifisapo iranti"
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

Verdaccio by default waits 2 minutes to invalidate the cache metadata before fetching new information from the remote registry.

```yaml
uplinks:
  npmjs:
    url: https://registry.npmjs.org/
    maxage: 30m
```

Increasing the value of `maxage` in each `uplink` remotes will be asked less frequently. This might be a valid stragegy if you don't update dependencies so often.

## Using the memory instead the hardrive

Sometimes caching packages is not a critical step, rather than route packages from different registries and achieving faster build times. There are two plugins that avoid write in a phisical hardrive at all using the memory.

```bash
  npm install -g verdaccio-auth-memory
  npm install -g verdaccio-memory
```

The configuration looks like this

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

Remember, once the server is restarted the data is being lost, we recomend this setup in cases where you do not need to persist at all.