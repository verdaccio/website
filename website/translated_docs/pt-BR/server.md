---
id: server-configuration
title: "Configuração do Servidor"
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

Você pode usar `crontab` e `forever` em conjunto para inicializar o verdaccio após a reinicialização do servidor. Quando você estiver logado como usuário do verdaccio, faça o seguinte:

```bash
$ crontab -e
```

Isso pode pedir para você escolher um editor. Escolha o seu favorito e prossiga. Adicione a seguinte entrada ao arquivo:

    @reboot /usr/bin/forever start /usr/lib/node_modules/verdaccio/bin/verdaccio
    

Os locais podem variar dependendo da configuração do servidor. Se você quiser saber onde estão seus arquivos, você pode usar o comando 'which':

```bash
$ which forever
$ which verdaccio
```

## Utilizar o systemd

Ao invés do `forever` você pode usar o `systemd` para iniciar o verdaccio e mantê-lo rodando. A instalação do Verdaccio possui uma unidade systemd, você só precisa copiá-la:

```bash
$ sudo cp /usr/lib/node_modules/verdaccio/systemd/verdaccio.service /lib/systemd/system/ && sudo systemctl daemon-reload
```

Esta unidade assume que você tenha a configuração em `/etc/verdaccio/config.yaml` e armazena dados em `/var/lib/verdaccio`, então mova seus arquivos para esses locais ou edite a unidade.