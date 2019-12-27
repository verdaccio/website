---
id: server-configuration
title: "Конфигурация сервера"
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

Чтобы получить больше информации о том, как использовать forever, обратитесь к его документаии.

## Переживаем перезапуски сервера

Вы можете использовать `crontab` и `forever` вместе, чтобы запустить verdaccio после перезагрузки сервера. Когда вы залогинены под пользователем verdaccio, сделайте следующее:

```bash
$ crontab -e
```

При этом вас могут попросить выбрать редактор. Выдерите свой любимый редактор и продолжайте - добавьте эти строчки в файл:

    @reboot /usr/bin/forever start /usr/lib/node_modules/verdaccio/bin/verdaccio
    

Пути к файлам могут отличаться в зависимости от ваших настроек. Если вы хотите узнать, где что лежит, вы можете использовать команду 'which':

```bash
$ which forever
$ which verdaccio
```

## Используем systemd

Вместо `forever` вы можете использовать `systemd` для старта verdaccio и поддержки его в запущенном состоянии. Установленный Verdaccio уже имеет модуль для systemd, вам нужно только скопировать его:

```bash
$ sudo cp /usr/lib/node_modules/verdaccio/systemd/verdaccio.service /lib/systemd/system/ && sudo systemctl daemon-reload
```

Этот модуль предполагает, что конфигурационный файл находится в `/etc/verdaccio/config.yaml` и хранилище находится в `/var/lib/verdaccio`, так что или переместите ваши файлы по этим путям, или отредактируйте пути в модуле.