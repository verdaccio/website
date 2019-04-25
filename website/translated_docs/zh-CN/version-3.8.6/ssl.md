---
id: version-3.8.6-ssl
title: 设置SSL 证书
original_id: ssl
---

依照这些说明来配置SSL 证书来服务HTTPS 下的NPM registry。

* 在`~/.config/verdaccio/config.yaml`更新监听属性：

    listen: 'https://your.domain.com/'
    

一旦更新监听，并试着再次运行verdaccio ，将会被要求使用证书。

* 生成证书

     $ openssl genrsa -out /Users/user/.config/verdaccio/verdaccio-key.pem 2048
     $ openssl req -new -sha256 -key /Users/user/.config/verdaccio/verdaccio-key.pem -out /Users/user/.config/verdaccio/verdaccio-csr.pem
     $ openssl x509 -req -in /Users/user/.config/verdaccio/verdaccio-csr.pem -signkey /Users/user/.config/verdaccio/verdaccio-key.pem -out /Users/user/.config/verdaccio/verdaccio-cert.pem
     ````
    
    * 编辑 config file `/Users/user/.config/verdaccio/config.yaml`并添加以下部分
    
    

https: key: /Users/user/.config/verdaccio/verdaccio-key.pem cert: /Users/user/.config/verdaccio/verdaccio-cert.pem ca: /Users/user/.config/verdaccio/verdaccio-csr.pem

    <br />Alternatively, if you have a certificate as `server.pfx` format, you can add the following configuration section. The passphrase is optional and only needed, if your certificate is encrypted.
    
    

https: pfx: /Users/user/.config/verdaccio/server.pfx passphrase: 'secret' ````

更多 关于`key`, `cert`, `ca`, `pfx` 和`passphrase` 参数信息，请参照 [节点文档](https://nodejs.org/api/tls.html#tls_tls_createsecurecontext_options)

* 在命令行运行`verdaccio`。

* 打开浏览器并加载`https://your.domain.com:port/`

此指南主要在OSX和 Linux里有效，在 Windows 里，路径将不同，但步骤是一样的。

## Docker

如果您使用Docker 镜像，您得设置`PROTOCOL` 环境变量到 `https`中，原因是因为 `listen` 参数由 [Dockerfile](https://github.com/verdaccio/verdaccio/blob/master/Dockerfile#L43)提供, 因此在您的config 文件中被忽略。

如果您使用不同于 `4873`的端口，您也可以设置 `PORT` 环境变量。