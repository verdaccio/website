---
author: Juan Picado
authorURL: https://twitter.com/jotadeveloper
authorFBID: 1122901551
title: Release 4.3.0
---

Verdaccio keeps growing thanks to their users. This release is a minor one we do every month, for further
[information about our releases can be read here](https://github.com/verdaccio/contributing/blob/master/RELEASES.md).

Furthermore, the info about the release is also available [at GitHub releases page](https://github.com/verdaccio/verdaccio/releases/tag/v4.1.0).

We have some highlights to share:

* At this stage, Docker 🐳 pulls [have grown to **5.7 million pulls**](https://dockeri.co/image/verdaccio/verdaccio).
* We just reached **7.9k 🌟**, *would you help us to reach 10k?* Give us your star ⭐️!
* **Blog** 🗒: Don't miss our new entry [**Managing multiples projects with Lerna and Yarn Workspaces**](https://verdaccio.org/blog/2019/09/07/managing-multiples-projects-with-lerna-and-yarn-workspaces) by [@sergiohgz](https://github.com/sergiohgz).
* **[Monorepo](https://github.com/verdaccio/monorepo)**: Along the last months we have crafted our monorepo for grouping all our ecosystem, plugin, core and tooling packages. This does not mean Verdaccio will become monorepo, rather help us to growth without affect the main repository and easy updates or fast response to mistakes in any release.
* **Hacktoberfest 🎃 is here**: We have prepared a guide if you want to contribute to Verdaccio, feel free to [read it](https://github.com/verdaccio/verdaccio/issues/1461) and give is feedback.

> If you 😍 Verdaccio as we do, helps us to grow more donating to the project via [OpenCollective](https://opencollective.com/verdaccio).

Thanks for support Verdaccio ! 👏👏👏👏.

<!--truncate-->

<div id="codefund">''</div>

## Use this version

### Docker

```bash
docker pull verdaccio/verdaccio:4.3.0
```

### npmjs

```bash
npm install -g verdaccio@4.3.0
```

## New Features

### [Browse web packages by version](https://github.com/verdaccio/verdaccio/issues/1457) by @juanpicado

When you publish a new version of your package, you want to be able to access the previous ones, that's exacltly what you can do with this new release.

![verdaccio browse by version](https://nyc3.digitaloceanspaces.com/verdaccio/blog/4.3.0/version_ui_navigation.gif)

> Note the README always point to the latest release, Verdaccio does not persist readme on each publish. This might change in the future, file a ticket if you are interested and might be considered if there is enough 👍🏻 votes.

### [npm token command support ](https://github.com/verdaccio/verdaccio/issues/1427) by @juanpicado, @Eomm and @juangabreil.

The command `npm token` is really useful to generate multiple tokens. This release ship some partial support for it and flagged as **experiment**, to enable it you must do the following in your config file.

```yaml
experiments:
  token: true
```

![npm token list](https://nyc3.digitaloceanspaces.com/verdaccio/blog/4.3.0/token_list.png)

You can find further technical information [here](https://github.com/verdaccio/verdaccio/pull/1427).

## Experiment Flags

This release include a new property named `experiments`. We want to be able to experiment new things without affect production environments. This flag allow us to add new features and get feedback from the community that wants to use them. This means the feature might not be stable.

### Other updates

- (Docker) Node.js update to 10.16.3 [#1473](https://github.com/verdaccio/verdaccio/issues/1473)
- (Logging) Ensure every log file has at least one record [#1414](https://github.com/verdaccio/verdaccio/issues/1414)
