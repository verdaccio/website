---
id: server-configuration
title: "Конфигурация сервера"
---

Это в основном про конфигурацию сервера на linux, но я думаю, что важно записать и опубликовать шаги, которые я проделал, чтобы получить постоянно работающий сервер verdaccio. Вам понадобится рут или sudo-права.

## Запуск сервера от отдельного пользователя

Сначала, создайте пользователя для verdaccio:

```bash
$ sudo adduser --system --gecos 'Verdaccio NPM mirror' --group --home /var/lib/verdaccio verdaccio
```

Или, в случае, когда у вас нет `adduser`:

```bash
$ sudo useradd --system --comment 'Verdaccio NPM mirror' --create-home --home-dir /var/lib/verdaccio --shell /sbin/nologin verdaccio
```

Потом запускаете шелл из-под пользователя verdaccio с помощью следующей команды:

```bash
$ sudo su -s /bin/bash verdaccio
$ cd
```

Команда `cd` отправит вас в домашнюю папк пользователя verdaccio. Убедитесь, что вы запустили verdaccio хотя бы один раз, чтобы файл конфигурации сгенерировался. Отредактируйте этот файл в соответствии со своими нуждами.

## Слушаем по всем адресам

Если вы хотите принимать запросы по всем сетевые интерфесам, установите следующие параметры в диррективе listen:

```yaml
# you can specify listen address (or simply a port)
listen: 0.0.0.0:4873
```

Если вы запускаете verdaccio на инстансе Amazon EC2, [вам необходимо изменить listen в конфигурационном файле](https://github.com/verdaccio/verdaccio/issues/314#issuecomment-327852203) так, как описано выше.

> Конфигурируете Apache or nginx? Пожалуйста, посмотрите [Reverse Proxy Setup](reverse-proxy.md)

## Делаем так, чтобы verdaccio был запущен всегда

Вы можете использовать пакет под названием ['forever'](https://github.com/nodejitsu/forever), чтобы поддерживать verdaccio в запущенным состоянии.

Сначала, установите `forever` в глобальном режиме:

```bash
$ sudo npm install -g forever
```

Убедитесь, что вы запустили verdaccio как минимум один раз, чтобы файл конфигурации сгенерировался и запишите созданного пользователя-администратора. Затем, вы можете использовать следующую команду для запуска verdaccio:

```bash
$ forever start `which verdaccio`
```

You can check the documentation for more information on how to use forever.

## Surviving server restarts

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