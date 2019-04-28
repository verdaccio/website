---
id: windows
title: "Установка в качестве службы Windows"
---

Основано на инструкции, найденной [здесь](http://asysadmin.tumblr.com/post/32941224574/running-nginx-on-windows-as-a-service). Я сделал следующее и получил полностью функциональный сервис verdaccio:

1. Создайте папку для verdaccio 
    * mkdir `c:\verdaccio`
    * cd `c:\verdaccio`
2. Установите verdaccio локально (у меня были проблемы при глобальной установке) 
    * npm install verdaccio
3. Создайте свой `config.yaml` в этой папке `(c:\verdaccio\config.yaml)`
4. Сконфигурируйте сервис Windows

## С помощью NSSM

АЛЬТЕРНАТИВНЫЙ МЕТОД: (пакета WinSW не было, когда я попытася скачать его)

* Скачайте [NSSM](https://www.nssm.cc/download/) и распакуйте его

* Добавьте путь к nssm.exe в PATH

* Откройте окно командной строки как администратор

* Запустите `nssm install verdaccio`. Как минимум, вы должны заполнить Path на вкладке Application, Startup directory и поле Arguments. Предполагая, что вы указали путь к Node в системных путях и что вы установили verdaccio в папку c:\verdaccio, можно использовать следующие значения:
    
    * Path: `node`
    * Startup directory: `c:\verdaccio`
    * Arguments: `c:\verdaccio\node_modules\verdaccio\build\lib\cli.js -c c:\verdaccio\config.yaml`
    
    Вы можете поменять настройки других сервисов в других вкладках, если хотите. Когда вы закончите, нажмите кнопку Install service
    
    * Запустите сервис sc start verdaccio

## С помощью WinSW

* На 2015-10-27, WinSW больше нет по указанному адресу. Пожалуйста, используйте инструкции под заголовком "С помощью NSSM" выше.
* Скачайте [WinSW](http://repo.jenkins-ci.org/releases/com/sun/winsw/winsw/) 
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