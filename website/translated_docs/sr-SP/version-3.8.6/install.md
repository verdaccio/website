---
id: version-3.8.6-installation
title: Инсталација
original_id: инсталација
---

Verdaccio је веб апликација подесна за многе платформе. Да бисте га инсталирали, потребно је да испуните неке предуслове.

#### Предуслови

1. Node виши од 
    - За верзију `verdaccio@2.x` Node `v4.6.1` је најстарија подржана верзија.
    - За верзију `verdaccio@latest` Node `6.12.0` је најстарија подржана верзија.
2. npm `>=3.x` или `yarn`
3. Веб интерфејс подржава `Chrome, Firefox, Edge, и IE9` претраживаче.

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

![install verdaccio](/svg/install_verdaccio.gif)

## Основна употреба

Једном када се инсталира, све што треба је да извршите CLI команду:

```bash
$> verdaccio
warn --- config file  - /home/.config/verdaccio/config.yaml
warn --- http address - http://localhost:4873/ - verdaccio/3.0.1
```

За додатне информације о CLI молимо Вас [да прочитате cli секцију](cli.md).

## Docker Image

`verdaccio` поседује званични docker image који можете користити, а у већини случајева, подразумевана конфигурација ради сасвим добро. За више информација о томе како да инсталирате official image, [прочитајте docker секцију](docker.md).

## Cloudron

`verdaccio` је такође доступан и као инсталација у само једном клику, на [Cloudron](https://cloudron.io)

[![Инсталирање](https://cloudron.io/img/button.svg)](https://cloudron.io/button.html?app=org.eggertsson.verdaccio)