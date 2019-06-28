---
id: version-3.8.6-contributing
title: Lilọwọsi Verdaccio
original_id: lilọwọsi
---

Lakọkọ naa 👏👏 o seun fun wiwa si oju ewe yii, fun wa o tumọ si pe o ṣetan lati ṣe ilọwọsi si `verdaccio` atipe inu wa dun fun eyi. Fifo lọ sinu ipilẹ koodu ti o jẹ ajeji ko rọrun ṣugbọn a wa nibi lati ran ọ lọwọ.

## Awọn ikanni Ibaraẹnisọrọ

Ti o ba ṣetan lati se ibeere, a n lo awọn ikanni meji fun awọn ijiroro:

* [Ikanni gbogbogbo Discord](http://chat.verdaccio.org/)

## Bibẹrẹ

Ni iwofiri akọkọ verdaccio jẹ ibi ipamọ kan soso, ṣugbọn awọn ọna pupọ wa ti o le gba lati ṣe ilọwọsi ati oriṣiriṣi awọn imọ ẹrọ lati danwo.

### Sisawari ipo mi

Gbogbo wa ni ọgbọn ọtọọtọ, nitorina, jẹ ki a wo ibiti o le rọrun fun ọ.

### Mo mọ tabi Mo fẹ lati kọ Node.js

Node.js ni ipilẹ `verdaccio`, a n lo awọn ibi ikowesi gẹgẹbi `express`, `commander`, `request` tabi `async`. Verdaccio lakotan jẹ API Rest ti o ṣẹda ibaraẹnisọrọ pẹlu awọn onibara `npm` ti o ni ibamu, gẹgẹbi `yarn`.

A ni [akojọ ti ohun elo asomọ](plugins.md) ti o gun to si ti ṣetan lati jẹ lilo ati mimu dara si sugbon ni bakanna [o le ṣẹda ti ara rẹ](dev-plugins.md).

### Emi yoo nifẹ lati ṣiṣẹ ninu Intafeesi Olumulo naa

Laipẹ a ti ko lọ si awọn imọ ẹrọ igbalode gẹgẹbi `React` ati `element-react`. A n fojusọna lati ri awọn ero tuntun lori bi a ṣe le mu Intafeesi Olumulo dara si.

### O rọmilọrun jọjọ lati mu eto akopọ naa dara si

Dajudaju, inu wa yoo dun ki o ṣe iranlọwọ fun wa lati mu eto akopọ naa dara sii, o le ṣe agbega awọn igbarale bi `eslint`, `stylelint`, `webpack`. O maa dara gan ti o ba le ṣe imudara iṣeto `webpack` diẹ si. A fayegba eyikeyi aba. Siwaju sii boya o ni iriri pẹlu **Yeoman** o le ṣe iranlọwọ fun wa pẹlu [ẹrọ amuagbarawa ti verdaccio](https://github.com/verdaccio/generator-verdaccio-plugin).

Eyi ninu diẹ ninu awọn ero:

* Ṣẹda awọn ofin ti eslint ti o wọpọ to ma jẹ lilo jakejado gbogbo awọn igbarale tabi awọn ohun elo asomọ
* Mu ifijiṣẹ awọn itumọ awọn iru Ilana dara si
* Gbigbe lọ si Webpack 4
* Improve hot reload with Webpack
* We use babel and webpack across all dependencies, why not a common preset?
* Improve continous integration delivery

### I do great Documentation

Many contributors find typos and grammar issues, that also helps to improve the overall experience for troubleshooting.

### I am a Designer

We have a frontend website <http://www.verdaccio.org/> that will be happy to see your ideas.

Our website is based on [Docusaurus](https://docusaurus.io/).

### I am a DevOps

We have a widely popular Docker image <https://hub.docker.com/r/verdaccio/verdaccio/> that need maintenance and pretty likely huge improvements, we need your knowledge for the benefits of all users.

We have support for **Kubernetes**, **Puppet**, **Ansible** and **Chef** and we need help in those fields, feel free to see all repositories.

### I can do translations

Verdaccio aims to be multilingual, in order to achieve it **we have the awesome support** of [Crowdin](https://crowdin.com) that is an amazing platform for translations.

<img src="https://d3n8a8pro7vhmx.cloudfront.net/uridu/pages/144/attachments/original/1485948891/Crowdin.png" width="400px" />

We have setup a project where you can choose your favourite language, if you do not find your language feel free to request one [creating a ticket](https://github.com/verdaccio/verdaccio/issues/new).

[Go to Crowdin Verdaccio](https://crowdin.com/project/verdaccio)

## I'm ready to contribute

If you are thinking *"I've seen already the [repositories](repositories.md) and I'm willing to start right away"* then I have good news for you, that's the next step.

You will need learn how to build, [we have prepared a guide just for that](build.md).

Once you have played around with all scripts and you know how to use them, we are ready to go to the next step, run the [**Unit Test**](test.md).

## Full list of contributors. We want to see your face here !

<a href="graphs/contributors"><img src="https://opencollective.com/verdaccio/contributors.svg?width=890&button=false" /></a>
