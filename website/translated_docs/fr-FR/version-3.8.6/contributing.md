---
id: version-3.8.6-contributing
title: Contribuer à Verdaccio
original_id: contribuant
---

First of all 👏👏 thanks for visiting this page, for us means you are willing contribute to `verdaccio` and we are happy for that. Passer à une base de code inconnue n'est pas facile, mais nous sommes là pour vous aider.

## Canaux de communication

Si vous souhaitez poser des questions, nous utilisons deux canaux de discussion:

* [Chaîne publique de Discord](http://chat.verdaccio.org/)

## Commencer

À première vue, verdaccio est un référentiel unique, mais il existe de nombreuses façons de contribuer et une grande variété de technologies à utiliser.

### Trouver ma place

Nous avons tous des compétences différentes, alors voyons où vous pouvez vous sentir confortable.

### Je connais ou je veux en apprendre Node.js

Node.js est la base de `verdaccio`, nous utilisons des bibliothèques comme `express`, `commander`, `request` ou `async`. Verdaccio est essentiellement un API Rest qui crée une communication avec les clients `npm`, comme `yarn`.

Nous avons une longue [liste de plugins](plugins.md) prête à être utilisée et améliorée, mais en même temps, [vous pouvez créer votre propre liste](dev-plugins.md).

### J'aurais préférer travailler dans l’Interface utilisateur

Recently we have moved to modern techonologies as `React` and `element-react`. We are looking forward to see new ideas how to improve the UI.

### Je me sens plus confortable en améliorant la pile

Bien sûr, nous serons heureux si vous pouviez nous aider à améliorer la pile, vous pouvez mettre à niveau des dépendances telles que `eslint`, `stylelint`, `webpack`. Ce serait très utile si vous pouvez simplement améliorer la configuration de `webpack`. Toute suggestion est la bienvenue. De même, si vous avez une expérience dans **Yeoman**, vous pouvez nous aider avec le [générateur de verdaccio](https://github.com/verdaccio/generator-verdaccio-plugin).

Voici quelques idées:

* Créer des règles communes d'eslint pouvant être utilisées dans toutes les dépendances ou plugins
* Améliorer la distribution des définitions de types de flux
* Migrer vers Webpack 4
* Améliorez le rechargement à chaud avec Webpack
* Nous utilisons babel et webpack à travers toutes les dépendances, pourquoi pas un préréglage commun?
* Améliorer la distribution continue de l'intégration

### Je fais une bonne documentation

De nombreux contributeurs trouvent des fautes de frappe et des problèmes de grammaire, ce qui contribue également à améliorer l'expérience globale de résolution de problèmes.

### Je suis un Designer

Nous avons une interface du site <http://www.verdaccio.org/> qui sera ravie de voir vos idées.

Notre site est basé sur [Docusaurus](https://docusaurus.io/).

### Je suis un DevOps

Nous avons une image très populaire sur Docker [ https://hub.docker.com/r/verdaccio/verdaccio/](https://hub.docker.com/r/verdaccio/verdaccio/) qui a besoin de maintenance et d’énormes améliorations, nous avons donc besoin de vos connaissances pour que tous les utilisateurs en bénéficient.

Nous avons un soutien pour **Kubernetes**, ** Puppet**, **Ansible** et **Chef** et nous avons besoin d'aide dans ces domaines, n'hésitez pas à voir tous les dépôts.

### Je peux faire des traductions

Verdaccio vise à être multilingue et, pour atteindre cet objectif, **nous bénéficions du soutien important** de [Crowdin](https://crowdin.com), qui est une plate-forme stupéfiante pour les traductions.

<img src="https://d3n8a8pro7vhmx.cloudfront.net/uridu/pages/144/attachments/original/1485948891/Crowdin.png" width="400px" />

Nous avons mis en place un projet dans lequel vous pouvez choisir la langue que vous préférez. Si vous ne trouvez pas la langue qui vous convient, n'hésitez pas à demander une en [créant un ticket](https://github.com/verdaccio/verdaccio/issues/new).

[Aller à Crowdin Verdaccio](https://crowdin.com/project/verdaccio)

## Je suis prêt à contribuer

Si vous pensez que *"J'ai déjà vu les [dépôts](repositories.md) et je souhaite commencer tout de suite"*, alors j'ai bien de bonnes nouvelles pour vous, Voici l'étape suivante.

Vous devrez apprendre à créer un projet, [nous avons préparé un guide à cet effet](build.md).

Une fois que vous vous êtes amusés avec tous les scripts et que vous avez compris comment les utiliser, nous sommes prêts pour passer à l'étape suivante: exécutez le [**Test unitaire**](test.md).

## Full list of contributors. We want to see your face here !

<a href="graphs/contributors"><img src="https://opencollective.com/verdaccio/contributors.svg?width=890&button=false" /></a>
