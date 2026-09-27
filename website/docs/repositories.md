---
id: repositories
title: Source Code
description: 'The repositories Verdaccio is developed in, and which part of the project lives in each one.'
---

Verdaccio is not a single repository: the registry, its plugins, the Docker images, the
Helm chart and the website are developed separately under the
[`verdaccio` organisation](https://github.com/orgs/verdaccio/repositories?type=source).

| Repository                                                                                        | What lives there                                                                                                                                                          |
| ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`verdaccio/verdaccio`](https://github.com/verdaccio/verdaccio)                                   | The registry itself, the built-in plugins, the web interface and the official Docker image. The `6.x` branch is the current stable line; `master` is where new work lands |
| [`verdaccio/website`](https://github.com/verdaccio/website)                                       | These docs                                                                                                                                                                |
| [`verdaccio/charts`](https://github.com/verdaccio/charts)                                         | The Helm chart                                                                                                                                                            |
| [`verdaccio/generator-verdaccio-plugin`](https://github.com/verdaccio/generator-verdaccio-plugin) | The scaffolding used by the [plugin generator](/dev/plugin-generator)                                                                                                     |

Plugins that are not built in — S3 and Google Cloud storage, LDAP and other
authentication backends — each have their own repository in the same organisation. The
[plugin catalogue](/dev/plugins-search) lists what is published, including community
plugins hosted elsewhere.

Look into the **issues** tab of the repository you are interested in to find something to
pick up, and see [contributing](/community/contributing) for how to get started.
