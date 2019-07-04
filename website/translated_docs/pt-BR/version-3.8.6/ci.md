---
id: version-3.8.6-ci
title: Integração Contínua
original_id: ci
---

Você pode usar verdaccio com integração contínua enquanto login ou publish. Ao usar o NPM para instalar um módulo privado em um ambiente de integração contínua pela primeira vez, uma parede de tijolos é rapidamente atingida. O comando de login NPM é projetado para ser usado interativamente. Isso causará um problema na Integração Contínua, scripts e etc. Temos um exemplo NPM login integração contínua de diferentes plataformas.

- [Travis CI](https://remysharp.com/2015/10/26/using-travis-with-private-npm-deps)
- [Circle CI 1.0](https://circleci.com/docs/1.0/npm-login/) ou [Circle CI 2.0](https://circleci.com/docs/2.0/deployment-integrations/#npm)
- [Gitlab CI](https://www.exclamationlabs.com/blog/continuous-deployment-to-npm-using-gitlab-ci/)