---
id: puppet
title: "Puppet"
---

Установите verdaccio на Debian, Ubuntu, Fedora, and RedHat.

# Использование

Есть два варианта установки verdaccio с помощью Puppet:

* Apply-mode (с помощью puppet-apply, установка puppetmaster не требется)
* Master-Agent-mode (с помощью puppet-agent с доступом к вашей конфигурации через puppetmaster).

В обоих вариантах вам надо сделать вызов "class nodejs {}" в вашем puppet-скрипте, потому что модуль puppet-verdaccio только выставляет требование на модуль nodejs, так что у вас появляется гибкость в выборе способа установки nodejs. Чтобы получить больше информации для варианта с Master-Agent-mode, прокрутите вниз.

For further information:

<https://github.com/verdaccio/puppet-verdaccio>

> We are looking for active contributors for this integration, if you are interested [refers to this ticket](https://github.com/verdaccio/puppet-verdaccio/issues/11).