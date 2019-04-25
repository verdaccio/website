---
id: iss-server
title: "Instalace na IIS serveru"
---

These instructions were written for Windows Server 2016, IIS 10, [Node.js 10.15.0](https://nodejs.org/), [iisnode 0.2.26](https://github.com/Azure/iisnode) and [verdaccio 3.11.0](https://github.com/verdaccio/verdaccio).

- Install IIS Install [iisnode](https://github.com/Azure/iisnode). Make sure you install prerequisites (Url Rewrite Module & node) as explained in the instructions for iisnode.
- Create a new folder in Explorer where you want to host verdaccio. For example `C:\verdaccio`. Save [package.json](#packagejson), [start.js](#startjs) and [web.config](#webconfig) in this folder.
- Create a new site in Internet Information Services Manager. You can name it whatever you want. I'll call it verdaccio in these [instructions](http://www.iis.net/learn/manage/configuring-security/application-pool-identities). Specify the path to where you saved all files and a port number.
- Go back to Explorer and give the user that runs the application pool modify rights to the folder you just created. If you've named the new site verdaccio and did not change the app pool, it's running under an ApplicationPoolIdentity and you should give the user IIS AppPool\verdaccio modify rights see instructions if you need help. (You can restrict access later if you want so that it only has modify rights on the iisnode and verdaccio\storage)
- Start a command prompt and execute the commands below to download verdaccio:

    cd c:\verdaccio
    npm install
    

- Make sure you have an inbound rule accepting TCP traffic to the port in Windows Firewall
- Thats it! Now you can navigate to the host and port that you specified

I wanted the `verdaccio` site to be the default site in IIS so I did the following:

- I stopped the "Default Web Site" and only start the site "verdaccio" site in IIS
- I set the bindings to "http", ip address "All Unassigned" on port 80, ok any warning or prompts

These instructions are based on [Host Sinopia in IIS on Windows](https://gist.github.com/HCanber/4dd8409f79991a09ac75). I had to tweak my web config as per below but you may find the original from the for mentioned link works better

A default configuration file will be created `c:\verdaccio\verdaccio\config.yaml`

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

### Alternate start.js for Verdaccio versions < v3.0

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
            <conditions logicalGrouping="MatchAll" trackAllCaptures="false" />
            <action type="None" />
        </rule>

        <!-- Rewrite all other urls in order for verdaccio to handle these -->
        <rule name="verdaccio">
            <match url="/*" />
            <conditions logicalGrouping="MatchAll" trackAllCaptures="false" />
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

### Troubleshooting

- **The web interface does not load when hosted with https as it tries to download scripts over http.**  
    Make sure that you have correctly mentioned `url_prefix` in verdaccio config. Follow the [discussion](https://github.com/verdaccio/verdaccio/issues/622).