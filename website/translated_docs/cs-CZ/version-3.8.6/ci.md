---
id: version-3.8.6-ci
title: Continuous Integration
original_id: ci
---

Při přihlášení nebo publikování můžete použít verdaccio s continuous integration. Při prvním použití NPM k instalaci soukromého modulu v prostředí continuous integration je rychle zasažena cihlová zeď. Příkaz NPM login je určen k interaktivnímu použití. To způsobuje problém v CI, skriptech atd. Zde je návod, jak používat NPM login pro různé platformy pro continuous integration.

- [Travis CI](https://remysharp.com/2015/10/26/using-travis-with-private-npm-deps)
- [Circle CI 1.0](https://circleci.com/docs/1.0/npm-login/) nebo [Circle CI 2.0](https://circleci.com/docs/2.0/deployment-integrations/#npm)
- [Gitlab CI](https://www.exclamationlabs.com/blog/continuous-deployment-to-npm-using-gitlab-ci/)