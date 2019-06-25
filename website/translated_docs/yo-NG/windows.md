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

* Ṣe imuṣiṣẹ nssm install verdaccio Ni o kere ju o gbọdọ pese idahun si Ọna taabu Ohun elo, Ibẹrẹ ọna ati Awọn aaye awọn ariyanjiyan. Assuming an install with node in the system path and a location of c:\verdaccio the below values will work:
    
    * Path: `node`
    * Startup directory: `c:\verdaccio`
    * Arguments: `c:\verdaccio\node_modules\verdaccio\build\lib\cli.js -c c:\verdaccio\config.yaml`
    
    You can adjust other service settings under other tabs as desired. When you are done, click Install service button
    
    * Start the service sc start verdaccio

## Using WinSW

* As of 2015-10-27, WinSW is no longer available at the below location. Please follow the Using NSSM instructions above.
* Download [WinSW](http://repo.jenkins-ci.org/releases/com/sun/winsw/winsw/) 
    * Place the executable (e.g. `winsw-1.9-bin.exe`) into this folder (`c:\verdaccio`) and rename it to `verdaccio-winsw.exe`
* Create a configuration file in `c:\verdaccio`, named `verdaccio-winsw.xml` with the following configuration `xml verdaccio verdaccio verdaccio node c:\verdaccio\node_modules\verdaccio\src\lib\cli.js -c c:\verdaccio\config.yaml roll c:\verdaccio`.
* Install your service 
    * `cd c:\verdaccio`
    * `verdaccio-winsw.exe install`
* Start your service 
    * `verdaccio-winsw.exe start`

Some of the above config is more verbose than I had expected, it appears as though 'workingdirectory' is ignored, but other than that, this works for me and allows my verdaccio instance to persist between restarts of the server, and also restart itself should there be any crashes of the verdaccio process.

## Repositories

* [verdaccio-deamon-windows](https://github.com/davidenke/verdaccio-deamon-windows)