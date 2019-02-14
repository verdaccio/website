---
id: version-3.8.6-iss-server
title: Instaliranje na IIS server
original_id: iss-server
---
Navedene instrukcije su pisane za Windows Server 2012, IIS 8, [Node.js 0.12.3](https://nodejs.org/), [iisnode 0.2.16](https://github.com/tjanczuk/iisnode) i [verdaccio 2.1.0](https://github.com/verdaccio/verdaccio).

- Instalirajte IIS Install [iisnode](https://github.com/tjanczuk/iisnode). Proverite da li ste instalirali sve što je neophodno kao preduslov (Url Rewrite Module & node), a što je dato u uputstvu za iisnode.
- Napravite novi folder u Explorer-u, koji će biti host za verdaccio. Na primer `C:\verdaccio`. Usnimite [package.json](#packagejson), [start.js](#startjs) i [web.config](#webconfig) u ovaj folder.
- Napravite novi sajt u Internet Information Services Manager. Možete ga nazvati kako Vam je volja. Zvaćemo ga verdaccio u ovim [instrukcijama](http://www.iis.net/learn/manage/configuring-security/application-pool-identities). Odredite path gde ćete snimiti sve fajlove i broj porta.
- Vratite se u Explorer i u okviru foldera koji ste upravo kreirali dodelite prava korisniku koji pokreće application pool. Ako ste imenovali novi sajt kao verdaccio i niste promenili app pool, on radi pod ApplicationPoolIdentity i trebalo bi da dodelite prava korisniku, IIS AppPool\verdaccio modify rights, pogledajte instrukcije ako Vam je potrebna pomoć. (Kasnije ako poželite, možete ograničiti pristup, tako da prava ostaju promenjena samo za iisnode i verdaccio\storage)
- Pokrenite command prompt i izvršite komande navedene ispod kako biste preuzeli verdaccio:

    cd c:\verdaccio
    npm install
    

- Postarajte se da imate dobro podešeno pravilo za prihvatanje TCP saobraćaja na port, u Windows Firewall
- To je to! Sada možete da navigate do host-a i porta koje ste odredili

Želeo sam da `verdaccio` sajt bude podrazumevani sajt u IIS i zato sam uradio sledeće:

- Postarao sam se da .npmrc file u `c:\users{yourname}` ima registry podešen na `"registry=http://localhost/"`
- Stopirao sam "Default Web Site" i pokrenuo jedino "verdaccio" sajt u IIS
- Podesio sam bindings na "http", ip address "All Unassigned" na port 80, ok any warning or prompts

Date instrukcije se baziraju na [Host Sinopia in IIS on Windows](https://gist.github.com/HCanber/4dd8409f79991a09ac75). Treba još da čačnem my web config kao što je navedeno ispod, ali može se desiti da navedeni link zapravo radi bolje

Kreiraće se podrazumevana konfiguracija `c:\verdaccio\verdaccio\config.yaml`

### package.json

```json
{
  "name": "iisnode-verdaccio",
  "version": "1.0.0",
  "description": "Hosts verdaccio in iisnode",
  "main": "start.js",
  "dependencies": {
    "verdaccio": "^2.1.0"
  }
}
```

### start.js

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

        <!-- iisnode folder is where iisnode stores it's logs. These should
        never be rewritten -->
        <rule name="iisnode" stopProcessing="true">
          <match url="iisnode*" />
          <action type="None" />
        </rule>

        <!-- Rewrite all other urls in order for verdaccio to handle these -->
        <rule name="verdaccio">
          <match url="/*" />
          <action type="Rewrite" url="start.js" />
        </rule>
      </rules>
    </rewrite>

    <!-- exclude node_modules directory and subdirectories from serving
    by IIS since these are implementation details of node.js applications -->
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

### Problemi (Troubleshooting)

- **Web interfejs se ne učitava kada je hostovan sa https pošto pokušava da preuzme skripte preko http.**  
    Proverite da li ste ispravno uneli `url_prefix` u verdaccio config. Pratite [diskusiju](https://github.com/verdaccio/verdaccio/issues/622).