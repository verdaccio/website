---
id: version-4.4.1-windows
title: Installazione come servizio di Windows
original_id: windows
---

Basato approssimativamente sulle istruzioni che trovi [qui](http://asysadmin.tumblr.com/post/32941224574/running-nginx-on-windows-as-a-service). Ho elaborato ciò che segue e mi ha fornito un servizio di installazione per verdaccio completamente funzionante:

1. Creare una directory per verdaccio
    * mkdir `c:\verdaccio`
    * cd `c:\verdaccio`
2. Installare verdaccio localmente (ho incontrato problemi con npm con le installazioni generali)
    * npm install verdaccio
3. Creare il file `config.yaml` in questa posizione `(c:\verdaccio\config.yaml)`
4. Configurare Windows Service

<div id="codefund">''</div>

## Utilizzo di NSSM

METODO ALTERNATIVO: (il pacchetto WinSW non era presente quando ho provato a scaricarlo)

* Scaricare [NSMM](https://www.nssm.cc/download/) ed estrarlo

* Aggiungere il percorso che contiene nssm.exe al PERCORSO

* Aprire un comando amministrativo

* Eseguire nssm install verdaccio. È necessario inserire nel Percorso della Application tab, la cartella Startup e i campi Argomenti. Supponendo un'installazione con node nel percorso di sistema ed una posizione di c:\verdaccio, i valori qui sotto funzioneranno:
    * Percorso: `node`
    * Cartella di avvio: `c:\verdaccio`
    * Argomenti: `c:\verdaccio\node_modules\verdaccio\build\lib\cli.js -c c:\verdaccio\config.yaml`

    È possibile adattare configurazioni di servizio alternative sotto altre tab come si desidera. Una volta terminato, cliccare sul pulsante Install service

 * Avviare il servizio sc start verdaccio

## Utilizzo di WinSW

* A partire dal 27/10/2015, WinSW non è più disponibile nella posizione seguente. Si prega di seguire le istruzioni sull'Utilizzo di NSSM scritte sopra.
* Scarica [WinSW](http://repo.jenkins-ci.org/releases/com/sun/winsw/winsw/)
    * Collocare l'eseguibile (e.g. `winsw-1.9-bin.exe`) in questa cartella (`c:\verdaccio`) e rinominarlo `verdaccio-winsw.exe`
* Creare un file di configurazione in `c:\verdaccio`, denominato `verdaccio-winsw.xml` con la seguente configurazione `xml verdaccio verdaccio verdaccio node c:\verdaccio\node_modules\verdaccio\src\lib\cli.js -c c:\verdaccio\config.yaml roll c:\verdaccio`.
* Installare il servizio
    * `cd c:\verdaccio`
    * `verdaccio-winsw.exe install`
* Avviare il servizio
    * `verdaccio-winsw.exe start`

Alcune delle configurazioni sopra citate sono più dettagliate di quanto mi aspettassi, sembra comunque che 'workingdirectory' venga ignorato, ma a parte questo, per me funziona e permette, nel mio caso, che verdaccio continui a funzionare tra i riavvi del server, ed inoltre che si riavvii da solo qualora dovessero esserci crash del processo di verdaccio.


## Repositori

* [verdaccio-deamon-windows](https://github.com/davidenke/verdaccio-deamon-windows)
