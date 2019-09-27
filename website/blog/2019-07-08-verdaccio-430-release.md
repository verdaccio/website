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

* At this stage, Docker downloads [have grown to 5.8 million pulls](https://dockeri.co/image/verdaccio/verdaccio).
* We just reached 7.9k stars, **would you help us to reach 10k?** Give us your star ⭐️!
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

### [Browse web package version]https://github.com/verdaccio/verdaccio/issues/1457) by @juanpicado

When you publish a new version of your package, you want to be able to access the previous ones, that's exacltly what you can do with this new release.

![verdaccio browse by version](https://nyc3.digitaloceanspaces.com/verdaccio/blog/4.3.0/64075807-3ca76780-ccbd-11e9-877b-42900d3fb9f4.gif)

> Note the README always point to the latest release, Verdaccio does not persist readme on each publish. This might change in the future, file a ticket if you are interested and might be considered if there is enough 👍🏻 votes.

### [npm token command support ](https://github.com/verdaccio/verdaccio/issues/1427) by @juanpicado, @Eomm and @juangabreil.

The command `npm token` is really useful to generate multiple tokens. This release ship some partial support for it and flagged as **experiment**, to enable it you must do the following in your config file

```yaml
experiments:
  token: true
```

You can find further technical information [here](https://github.com/verdaccio/verdaccio/pull/1427).

### Other updates

- (Docker) Node.js update to 10.16.3 [#1473](https://github.com/verdaccio/verdaccio/issues/1473)
- (Logging) Ensure every log file has at least one record [#1414](https://github.com/verdaccio/verdaccio/issues/1414)
