---
id: server-configuration
title: "Configuração do Servidor"
---

Este é o material mais básico para configuração do servidor em linux, mas eu achei importante documentar e compartilhar os passos que tomei para fazer o verdaccio rodar permanentemente no meu servidor. Você precisará de permissões de root (ou sudo) para o seguinte.

## Executar como um usuário separado

Primeiro crie o usuário de verdaccio:

```bash
$ sudo adduser --system --gecos 'Verdaccio NPM mirror' --group --home /var/lib/verdaccio verdaccio
```

Ou, caso você não tenha `adduser`:

```bash
$ sudo useradd --system --comment 'Verdaccio NPM mirror' --create-home --home-dir /var/lib/verdaccio --shell /sbin/nologin verdaccio
```

Crie um shell como um usuário verdaccio usando o seguinte comando:

```bash
$ sudo su -s /bin/bash verdaccio
$ cd
```

O comando `cd` envia você para o diretório home do usuário verdaccio. Certifique-se de executar o verdaccio pelo menos uma vez para gerar o arquivo de configuração. Edite-o de acordo com as suas necessidades.

## Ouvir a todos os endereços

Se você quiser ouvir cada endereço externo, defina a diretiva de escuta (listening) na configuração para:

```yaml
# you can specify listen address (or simply a port)
listen: 0.0.0.0:4873
```

Se você está executando o verdaccio em uma instância do Amazon EC2, [você precisará definir o listen e alterar o seu arquivo de configuração](https://github.com/verdaccio/verdaccio/issues/314#issuecomment-327852203), como descrito acima.

> Configurar Apache ou nginx? Por favor, confira a [Configuração de Proxy Reverso](reverse-proxy.md)

## Manter o verdaccio em execução para sempre

Você pode usar o pacote de node chamado ['forever'](https://github.com/nodejitsu/forever) para manter o verdaccio em execução o tempo todo.

Primeiro instale o `forever` globalmente:

```bash
$ sudo npm install -g forever
```

Certifique-se de ter executado o verdaccio pelo menos uma vez para gerar o arquivo de configuração e anote o usuário administrador criado. Você pode então usar o seguinte comando para iniciar o verdaccio:

```bash
$ forever start `which verdaccio`
```

Você pode verificar a documentação para obter mais informações sobre como usar o forever.

## Sobreviver a reinicializações do servidor

You can use `crontab` and `forever` together to start verdaccio after a server reboot. When you're logged in as the verdaccio user do the following:

```bash
$ crontab -e
```

This might ask you to choose an editor. Pick your favorite and proceed. Add the following entry to the file:

    @reboot /usr/bin/forever start /usr/lib/node_modules/verdaccio/bin/verdaccio
    

The locations may vary depending on your server setup. If you want to know where your files are you can use the 'which' command:

```bash
$ which forever
$ which verdaccio
```

## Using systemd

Instead of `forever` you can use `systemd` for starting verdaccio and keeping it running. Verdaccio installation has systemd unit, you only need to copy it:

```bash
$ sudo cp /usr/lib/node_modules/verdaccio/systemd/verdaccio.service /lib/systemd/system/ && sudo systemctl daemon-reload
```

This unit assumes you have configuration in `/etc/verdaccio/config.yaml` and store data in `/var/lib/verdaccio`, so either move your files to those locations or edit the unit.