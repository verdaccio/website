---
id: ci
title: "Continuous Integration"
---

Можете користити verdaccio са continuous integration док вршите login или публиковање. Када по први пут користите NPM како бисте инсталирали private module у continuous integration окружење, ударићете главом у зид. Команда за NPM login је дизајнирана тако да се користи на интерактиван начин. То прави проблеме у CI, scripts, и чему све не. Ево како би требало да користите NPM login за различите continuous integration платформе.

- [Travis CI](https://remysharp.com/2015/10/26/using-travis-with-private-npm-deps)
- [Circle CI 1.0](https://circleci.com/docs/1.0/npm-login/) или [Circle CI 2.0](https://circleci.com/docs/2.0/deployment-integrations/#npm)
- [Gitlab CI](https://www.exclamationlabs.com/blog/continuous-deployment-to-npm-using-gitlab-ci/)