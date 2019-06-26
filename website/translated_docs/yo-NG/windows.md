---
id: windows
title: "Fifi sori ẹrọ Bi Iṣẹ Windows kan"
---

O da lori awọn itọnisọna ti o wa [nibi](http://asysadmin.tumblr.com/post/32941224574/running-nginx-on-windows-as-a-service). Mo ṣẹda iwọnyi ti o si wa pese iṣẹ verdaccio ti o n ṣiṣẹ ni kikun fun mi:

1. Ṣẹda ọna fun verdaccio 
    * mkdir `c:\verdaccio`
    * cd `c:\verdaccio`
2. Fi verdaccio sori ẹrọ ni ibilẹ (Mo salaba pade awọn iṣoro npm pẹlu awọn fifisori ti agbaye) 
    * npm install verdaccio
3. Ṣẹda faili `config.yaml` rẹ ni aaye yii `(c:\verdaccio\config.yaml)`
4. Iṣeto Iṣẹ Windows

## Lilo NSSM

ỌNA MIRAN: (Akopọ WinSW ti sọnu nigbati mo gbiyanju lati gba lati ayelujara)

* Gba [NSSM](https://www.nssm.cc/download/) ki o si fa jade

* Se afikun ọna ti o ni nssm.exe si PATH

* Ṣi aṣẹ isakoso kan

* Ṣe imuṣiṣẹ nssm install verdaccio Ni o kere ju o gbọdọ pese idahun si Ọna taabu Ohun elo, Ibẹrẹ ọna ati Awọn aaye awọn ariyanjiyan. Kani wipe ifisori ẹrọ pẹlu oju ipade ninu ọna eto naa ati aaye kan ti c:\verdaccio awọn iye to wa ni isalẹ yoo ṣiṣẹ:
    
    * Path: `node`
    * Startup directory: `c:\verdaccio`
    * Awọn ariyanjiyan: `c:\verdaccio\node_modules\verdaccio\build\lib\cli.js -c c:\verdaccio\config.yaml`
    
    O le ṣatunṣe awọn iseto iṣẹ miiran labẹ awọn taabu miiran bi o ba se fẹ. Nigbati o ba ti ṣetan, tẹ bọtini Fi iṣẹ sori ẹrọ
    
    * Bẹrẹ iṣẹ sc naa bẹrẹ verdaccio

## Lilo WinSW

* Titi di 2015-10-27, WinSW ko si ni aaye to wa ni isalẹ yii mọ. Jọwọ tẹle awọn ilana itọnisọna Lilo NSSM loke.
* Gba lati ayelujara [WinSW](http://repo.jenkins-ci.org/releases/com/sun/winsw/winsw/) 
    * Gbe awọn iṣẹ ṣiṣe naa (fun apẹẹrẹ `winsw-1.9-bin.exe`) sinu foda yii (`c:\verdaccio`) ki o si pa lorukọ da si `verdaccio-winsw.exe`
* Ṣẹda faili iṣeto kan ni `c:\verdaccio`, ti o n jẹ `verdaccio-winsw.xml` pẹlu iṣeto wọnyii `xml verdaccio verdaccio verdaccio node c:\verdaccio\node_modules\verdaccio\src\lib\cli.js -c c:\verdaccio\config.yaml roll c:\verdaccio`.
* Fi iṣẹ rẹ sii 
    * `cd c:\verdaccio`
    * `verdaccio-winsw.exe install`
* Bẹrẹ iṣẹ rẹ 
    * `verdaccio-winsw.exe start`

Some of the above config is more verbose than I had expected, it appears as though 'workingdirectory' is ignored, but other than that, this works for me and allows my verdaccio instance to persist between restarts of the server, and also restart itself should there be any crashes of the verdaccio process.

## Repositories

* [verdaccio-deamon-windows](https://github.com/davidenke/verdaccio-deamon-windows)