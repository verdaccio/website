---
id: version-4.0.0-alpha.4-iss-server
title: Установка на IIS сервер
original_id: iss-server
---
These instructions were written for Windows Server 2016, IIS 10, [Node.js 10.15.0](https://nodejs.org/), [iisnode 0.2.26](https://github.com/Azure/iisnode) and [verdaccio 3.11.0](https://github.com/verdaccio/verdaccio).

- Install IIS Install [iisnode](https://github.com/Azure/iisnode). Make sure you install prerequisites (Url Rewrite Module & node) as explained in the instructions for iisnode.
- Создайте новую директорию в Explorer, в которой вы хотите расположить verdaccio. Например `C:\verdaccio`. Сохраните [package.json](#packagejson), [start.js](#startjs) и [web.config](#webconfig) в эту директорию.
- Создайте новый сайт c помощью Internet Information Services Manager. Можете назвать его как хотите. Я буду называть его verdaccio в этих [инструкциях](http://www.iis.net/learn/manage/configuring-security/application-pool-identities). Укажите путь к сохранённым файлам и номер порта.
- Вернитесь в Explorer и дайте пользователю, который будет запускать приложение, права на изменение созданной вами ранее директории. Если вы назвали новый сайт verdaccio и не меняли пул приложения, он запустится под ApplicationPoolIdentity и вы должны дать пользователю IIS AppPool\verdaccio права на изменение, смотрите инструкцию, если вам требуется помощь. (Вы можете ограничить доступ позже, если вы хотите, чтобы права распространялись только на iisnode и verdaccio\storage)
- Запустите команду строку и выполните эти команды для загрузки verdaccio:

    cd c:\verdaccio
    npm install
    

- Убедитесь, что у вас есть правила приёма входящего TCP подключения на порт в Windows Firewall
- Thats it! Now you can navigate to the host and port that you specified

Я хотел чтобы сайт `verdaccio` был сайтом по умолчанию в IIS, по этому я сделал так:

- Я остановил "Default Web Site" и просто запустил сайт "verdaccio" в IIS
- Я установил привязку ip адреса "Всех неназначенных" к "http" на 80ый порт, чтобы избежать предупреждений или запросов

Эта инструкция основана на [Host Sinopia в IIS под Windows](https://gist.github.com/HCanber/4dd8409f79991a09ac75). Мне пришлось настроить мою конфигурацию, так как показано ниже. Но вы можете обратиться к оригиналу по приведённой выше ссылке

Файл конфигурации по умолчанию будет создан `c:\verdaccio\verdaccio\config.yaml`

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

### Устранение проблем

- **Web интерфейс не загружается, когда используется https, из-за попыток загрузить скрипты по http.**  
    Убедитесь что у вас правильно указан `url_prefix` в конфигурации verdaccio. Перейти к [обсуждению](https://github.com/verdaccio/verdaccio/issues/622).