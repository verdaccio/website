---
id: version-4.0.0-alpha.4-iss-server
title: Installazione sul server IIS
original_id: iss-server
---
Queste istruzioni sono state scritte per Windows Server 2016, IIS 10, [Node.js 10.15.0](https://nodejs.org/), [iisnode 0.2.26](https://github.com/Azure/iisnode) e [verdaccio 3.11.0](https://github.com/verdaccio/verdaccio).

- Install IIS Install [iisnode](https://github.com/Azure/iisnode). Assicurarsi di installare i prerequisiti (Url Rewrite Module & node) come spiegato nelle istruzioni di iisnode.
- Creare una nuova cartella in Explorer in cui si desidera ospitare verdaccio. Per esempio `C:\verdaccio`. Salvare in questa cartella [package.json](#packagejson), [start.js](#startjs) e [web.config](#webconfig).
- Creare un nuovo sito su Internet Information Services Manager. È possibile nominarlo come si preferisce. In queste [istruzioni](http://www.iis.net/learn/manage/configuring-security/application-pool-identities) verrà chiamato verdaccio. Specificare il percorso in cui sono stati salvati i file ed il numero della porta.
- Tornare indietro a Explorer e autorizzare l'utente che esegue il gruppo di applicazioni a poter modificare la cartella appena creata. Se si è nominato il nuovo sito verdaccio e non si è modificato il gruppo di applicazioni, allora questo sta funzionando grazie ad un'ApplicationPoolIdentity e si dovrebbe dare all'utente le autorizzazioni di poter modificare IIS AppPool\verdaccio, vedere le istruzioni in caso di aiuto. (Se si desidera è possibile restringere l'accesso successivamente, così che si abbiano solo le autorizzazioni per modificare su iisnode e verdaccio/storage)
- Iniziare un prompt dei comandi ed eseguire quelli sottostanti per scaricare verdaccio:

    cd c:\verdaccio
    npm install
    

- Assicurarsi di possedere una regola in entrata che accetti il traffico TCP alla porta in Windows Firewall
- Con questo è tutto! Ora è possibile navigare nell'host e nella porta specificati

Desideravo che `verdaccio` fosse il sito di default su IIS, quindi ho intrapreso le seguenti azioni:

- Ho arrestato il "Sito Web predefinito" e ho avviato esclusivamente il sito "verdaccio" su IIS
- Ho stabilito le connessioni a "http", indirizzo ip "All Unassigned" sulla porta 80, ok qualsiasi avvertenza o prompt

Queste istruzioni sono basate su [Host Sinopia in IIS on Windows](https://gist.github.com/HCanber/4dd8409f79991a09ac75). Ho dovuto fare un piccolo aggiustamento alla configurazione web come si può notare qui sotto, ma è possibile trovare l'originale dal link menzionato che funziona meglio

Verrà creato un file di configurazione predefinito `c:\verdaccio\verdaccio\config.yaml`

### package.json

```json
{
  "name": "iisnode-verdaccio",
  "version": "1.0.0",
  "description": "Hosts verdaccio in iisnode",
  "main": "start.js",
  "dependencies": {
    "verdaccio": "^3.11.0"
  }
}
```

### start.js

```bash
process.argv.push('-l', 'unix:' + process.env.PORT, '-c', './config.yaml'); 
require('./node_modules/verdaccio/build/lib/cli.js');
```

### In Alternativa start.js per Verdaccio versioni < v3.0

```bash
process.argv.push('-l', 'unix:' + process.env.PORT);
require('./node_modules/verdaccio/src/lib/cli.js');
```

### web.config

```xml
<configuration>
  <system.webServer>
    <modules>
        <remove name="WebDAVModule" />
    </modules>

    <!-- indicates that the start.js file is a node.js application
    to be handled by the iisnode module -->
    <handlers>
            <remove name="WebDAV" />
            <add name="iisnode" path="start.js" verb="*" modules="iisnode" resourceType="Unspecified" requireAccess="Execute" />
            <add name="WebDAV" path="*" verb="*" modules="WebDAVModule" resourceType="Unspecified" requireAccess="Execute" />
    </handlers>

    <rewrite>
      <rules>

        <!-- iisnode folder is where iisnode stores it's logs. Queste non dovrebbero
        mai essere riscritte -->
        <rule name="iisnode" stopProcessing="true">
            <match url="iisnode*" />
            <conditions logicalGrouping="MatchAll" trackAllCaptures="false" />
            <action type="None" />
        </rule>

        <!-- Riscrivi tutte gli altri url affinché Verdaccio li gestisca -->
        <rule name="verdaccio">
            <match url="/*" />
            <conditions logicalGrouping="MatchAll" trackAllCaptures="false" />
            <action type="Rewrite" url="start.js" />
        </rule>
      </rules>
    </rewrite>

    <!-- escludere la directory node_modules e le sottodirectory dalla pubblicazione
     da IIS poiché questi sono dettagli di implementazione delle applicazioni node.js -->
    <security>
      <requestFiltering>
        <hiddenSegments>
          <add segment="node_modules" />
        </hiddenSegments>
      </requestFiltering>
    </security>

  </system.webServer>
</configuration>
```

### Risoluzione dei problemi

- **L'interfaccia web non viene caricata quando è allocata su https dal momento che tenta di scaricare script su http.**  
    Assicurarsi di aver nominato correttamente `url-prefix` nella configurazione di verdaccio. Seguire la [discussione](https://github.com/verdaccio/verdaccio/issues/622).