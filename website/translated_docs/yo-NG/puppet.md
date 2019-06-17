---
id: puppet
title: "Puppet"
---

Fi verdaccio sori ẹrọ fun Debian, Ubuntu, Fedora, ati RedHat.

# Ilo

Awọn orisi ọna meji lo wa lati fi verdaccio sori ẹrọ nipa lilo modulu Puppet yii:

* Ipo-iṣamulo (pẹlu puppet-apply ati pe ko nilo siseto puppetmaster)
* Ipo-Master-Agent (pẹlu puppet-agent ti n wọle si iṣeto rẹ nipasẹ puppetmaster).

In both variants you have to explicitely call "class nodejs {}" in your puppet script because the puppet-verdaccio module only defines this as a requirement, so you have all the flexibility you want when installing nodejs. Scroll down for details about Master-Agent-mode variant.

For further information:

<https://github.com/verdaccio/puppet-verdaccio>

> We are looking for active contributors for this integration, if you are interested [refers to this ticket](https://github.com/verdaccio/puppet-verdaccio/issues/11).