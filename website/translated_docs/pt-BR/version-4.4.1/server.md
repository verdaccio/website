---
id: version-4.4.1-server-configuration
title: Configuração do Servidor
original_id: server-configuration
---

Este é o material mais básico para configuração do servidor em linux, mas eu achei importante documentar e compartilhar os passos que tomei para fazer o verdaccio rodar permanentemente no meu servidor. Você precisará de permissões de root (ou sudo) para o seguinte.

<div id="codefund">''</div>

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

The `cd` command sends you to the home directory of the verdaccio user. Make sure you run verdaccio at least once to generate the config file. Edit it according to your needs.

## Ouvir a todos os endereços
Se você quiser ouvir cada endereço externo, defina a diretiva de escuta (listening) na configuração para:
```yaml
# you can specify listen address (or simply a port)
listen: 0.0.0.0:4873
```

Se você está executando o verdaccio em uma instância do Amazon EC2, [você precisará definir o listen e alterar o seu arquivo de configuração](https://github.com/verdaccio/verdaccio/issues/314#issuecomment-327852203), como descrito acima.

> Configure Apache or nginx? Please check out the [Reverse Proxy Setup](reverse-proxy.md)

## Manter o verdaccio em execução para sempre
Você pode usar o pacote de node chamado ['forever'](https://github.com/nodejitsu/forever) para manter o verdaccio em execução o tempo todo.

Primeiro instale o `forever` globalmente:
```bash
$ sudo npm install -g forever
```

Make sure you've run verdaccio at least once to generate the config file and write down the created admin user. You can then use the following command to start verdaccio:

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

```
@reboot /usr/bin/forever start /usr/lib/node_modules/verdaccio/bin/verdaccio
```

The locations may vary depending on your server setup. If you want to know where your files are you can use the 'which' command:

```bash
$ which forever
$ which verdaccio
```

## Utilizar o systemd
Instead of `forever` you can use `systemd` for starting verdaccio and keeping it running. Verdaccio installation has systemd unit, you only need to copy it:
```bash
$ sudo cp /usr/lib/node_modules/verdaccio/systemd/verdaccio.service /lib/systemd/system/ && sudo systemctl daemon-reload
```
Esta unidade assume que você tenha a configuração em `/etc/verdaccio/config.yaml` e armazena dados em `/var/lib/verdaccio`, então mova seus arquivos para esses locais ou edite a unidade.
