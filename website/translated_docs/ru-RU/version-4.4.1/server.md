---
id: version-4.4.1-server-configuration
title: Конфигурация сервера
original_id: server-configuration
---

Это в основном про конфигурацию сервера на linux, но я думаю, что важно записать и опубликовать шаги, которые я проделал, чтобы получить постоянно работающий сервер verdaccio. Вам понадобится рут или sudo-права.

<div id="codefund">''</div>

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

The `cd` command sends you to the home directory of the verdaccio user. Make sure you run verdaccio at least once to generate the config file. Edit it according to your needs.

## Слушаем по всем адресам
Если вы хотите принимать запросы по всем сетевые интерфесам, установите следующие параметры в диррективе listen:
```yaml
# you can specify listen address (or simply a port)
listen: 0.0.0.0:4873
```

Если вы запускаете verdaccio на инстансе Amazon EC2, [вам необходимо изменить listen в конфигурационном файле](https://github.com/verdaccio/verdaccio/issues/314#issuecomment-327852203) так, как описано выше.

> Configure Apache or nginx? Please check out the [Reverse Proxy Setup](reverse-proxy.md)

## Делаем так, чтобы verdaccio был запущен всегда
Вы можете использовать пакет под названием ['forever'](https://github.com/nodejitsu/forever), чтобы поддерживать verdaccio в запущенным состоянии.

Сначала, установите `forever` в глобальном режиме:
```bash
$ sudo npm install -g forever
```

Make sure you've run verdaccio at least once to generate the config file and write down the created admin user. You can then use the following command to start verdaccio:

```bash
$ forever start `which verdaccio`
```

Чтобы получить больше информации о том, как использовать forever, обратитесь к его документаии.

## Переживаем перезапуски сервера
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

## Используем systemd
Instead of `forever` you can use `systemd` for starting verdaccio and keeping it running. Verdaccio installation has systemd unit, you only need to copy it:
```bash
$ sudo cp /usr/lib/node_modules/verdaccio/systemd/verdaccio.service /lib/systemd/system/ && sudo systemctl daemon-reload
```
Этот модуль предполагает, что конфигурационный файл находится в `/etc/verdaccio/config.yaml` и хранилище находится в `/var/lib/verdaccio`, так что или переместите ваши файлы по этим путям, или отредактируйте пути в модуле.
