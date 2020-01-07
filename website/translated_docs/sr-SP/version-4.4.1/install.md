---
id: version-4.4.1-installation
title: Инсталација
original_id: инсталација
---

Verdaccio је веб апликација подесна за многе платформе. Да бисте га инсталирали, потребно је да испуните неке предуслове.

#### Предуслови

1. Node виши од
    - For version `verdaccio@3.x` Node `v6.12` is the minimum supported version.
    - For version `verdaccio@4.0.0-alpha.x` or `verdaccio@4.x` Node `8.x` (LTS "Carbon") is the minimum supported version.
2. npm `>=5.x` or `yarn`

  > We highly recommend to use the latest Node Package Managers clients `> npm@6.x | yarn@1.x | pnpm@4.x`
3. The web interface supports the `Chrome, Firefox, Edge, and IE11` browsers.

> Verdaccio will support latest Node.js version according the [Node.js Release Working Group](https://github.com/nodejs/Release) recomendations.

<div id="codefund">''</div>

## Инсталација CLI

`verdaccio` мора бити инсталиран глобално, коришћењем неке од наведених метода:

Користи `npm`

```bash
npm install -g verdaccio
```
или користи `yarn`

```bash
yarn global add verdaccio
```

![install verdaccio](assets/install_verdaccio.gif)


## Основна употреба

Једном када се инсталира, све што треба је да извршите CLI команду:

```bash
$> verdaccio
warn --- config file  - /home/.config/verdaccio/config.yaml
warn --- http address - http://localhost:4873/ - verdaccio/3.0.0
```

За додатне информације о CLI молимо Вас [да прочитате cli секцију](cli.md).

You can set the registry by using the following command.

```bash
npm set registry http://localhost:4873/
```

or you can pass a `--registry` flag when needed.

```bash
npm install --registry http://localhost:4873
```

## Docker Image

`verdaccio` поседује званични docker image који можете користити, а у већини случајева, подразумевана конфигурација ради сасвим добро. За више информација о томе како да инсталирате official image, [прочитајте docker секцију](docker.md).

## Cloudron

`verdaccio` је такође доступан и као инсталација у само једном клику, на [Cloudron](https://cloudron.io)

[![Инсталирање](https://cloudron.io/img/button.svg)](https://cloudron.io/button.html?app=org.eggertsson.verdaccio)

