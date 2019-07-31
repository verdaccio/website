---
id: version-3.8.6-iss-server
title: Instalando em um Servidor ISS
original_id: iss-server
---

These instructions were written for Windows Server 2012, IIS 8, [Node.js 0.12.3](https://nodejs.org/), [iisnode 0.2.16](https://github.com/tjanczuk/iisnode) and [verdaccio 2.1.0](https://github.com/verdaccio/verdaccio).

- Install IIS Install [iisnode](https://github.com/tjanczuk/iisnode). Make sure you install prerequisites (Url Rewrite Module & node) as explained in the instructions for iisnode.
- Crie uma nova pasta no Explorer onde você deseja hospedar o verdaccio. Por exemplo `C:\verdaccio`. Salve o [package.json](#packagejson), [start.js](#startjs) e [web.config](#webconfig) nesta pasta.
- Crie um novo site no Gerenciador de Serviços de Informações da Internet. Você pode nomea-lo como quiser. Chamarei de verdaccio nestas [instruções](http://www.iis.net/learn/manage/configuring-security/application-pool-identities). Especifique o caminho onde você salvou todos os arquivos e um número de porta.
- Volte para o Explorer e forneça, ao usuário que executa a pool de aplicações, direitos de modificação para a pasta recém criada. Se você nomeou o novo site como verdaccio e não alterou a pool de aplicações, ele está sendo executado sob uma ApplicationPoolIdentity e você deve conceder ao usuário direitos de modificação de IIS AppPool\verdaccio, veja as instruções se precisar de ajuda. (Você pode restringir o acesso mais tarde caso o queira, para que ele tenha apenas direitos de modificação no iisnode e no verdaccio\storage)
- Inicie um prompt de comando e execute os comandos abaixo para fazer o download do verdaccio:

    cd c:\verdaccio
    npm install
    

- Verifique se você tem uma regra de entrada aceitando o tráfego TCP na porta do Firewall do Windows
- Thats it! Now you can navigate to the host and port that you specified

Eu queria que o site do `verdaccio` fosse o site padrão no IIS, então fiz o seguinte:

- I made sure the .npmrc file in `c:\users{yourname}` had the registry set to `"registry=http://localhost/"`
- I stopped the "Default Web Site" and only start the site "verdaccio" site in IIS
- I set the bindings to "http", ip address "All Unassigned" on port 80, ok any warning or prompts

Estas instruções são baseadas em [Host Sinopia in IIS on Windows](https://gist.github.com/HCanber/4dd8409f79991a09ac75). Eu tive que fazer pequenos ajustes na minha configuração web, como você pode ver abaixo, mas você pode encontrar o original do link mencionado que funciona melhor

Um arquivo de configuração padrão será criado `c:\verdaccio\verdaccio\config.yaml`

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

### Troubleshooting

- **A interface da Web não é carregada quando hospedada em https, pois tentará baixar scripts por meio de http.**  
    Certifique-se de ter mencionado corretamente o `url_prefix` na configuração do verdaccio. Siga a [ discussão](https://github.com/verdaccio/verdaccio/issues/622).