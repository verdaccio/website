---
id: version-3.8.6-kubernetes
title: Kubernetes
original_id: kubernetes
---
Можете наћи упутства како да извршите deploy Verdaccio-a на Kubernetes кластер у [verdaccio/docker-example](https://github.com/verdaccio/docker-examples/tree/master/kubernetes-example) репозиторијуму. Ипак, препоручујемо да инсталирате Verdaccio на Kubernetes кластер тако што ћете користити [Helm](https://helm.sh). Helm је [Kubernetes](https://kubernetes.io) package manager који доноси многе погодности.

## Helm

### Setup Helm

Ако раније нисте користили Helm, потребно је да подесите Helm контролер звани Tiller:

```bash
helm init
```

### Инсталирање

У борбени распоред поставите (шалим се, deploy) Helm [stable/verdaccio](https://github.com/kubernetes/charts/tree/master/stable/verdaccio) chart. У овом примеру користимо `npm` као име издања:

```bash
helm install --name npm stable/verdaccio
```

### Постављање специфичне верзије (deploy)

```bash
helm install --name npm --set image.tag=2.6.5 stable/verdaccio
```

### Надограђивање Verdaccio-а

```bash
helm upgrade npm stable/verdaccio
```

### Деинсталирање

```bash
helm del --purge npm
```

**Напомена:** ова команда брише све ресурсе, укључујући и пакете који су можда раније објављени у регистрију.

### Корисничка конфигурација Verdaccio-а

Можете подесити Verdaccio конфигурацију по својим жељама тако што ћете користити Kubernetes *configMap*.

#### Припрема

Копирајте [existing configuration](https://github.com/verdaccio/verdaccio/blob/master/conf/full.yaml) и адаптирајте за своју сврху:

```bash
wget https://raw.githubusercontent.com/verdaccio/verdaccio/master/conf/full.yaml -O config.yaml
```

**Напомена:** Проверите да ли користите исправан path за storage који се користи за persistency:

```yaml
storage: /verdaccio/storage/data
auth:
  htpasswd:
    file: /verdaccio/storage/htpasswd
```

#### Постављање configMap (deploy)

Поставите `configMap` на кластер

```bash
kubectl create configmap verdaccio-config --from-file ./config.yaml
```

#### Поставите Verdaccio

Сада можете поставити Verdaccio Helm chart и детаљно дефинисати конфигурацију која ће да се користи:

```bash
helm install --name npm --set customConfigMap=verdaccio-config stable/verdaccio
```

## Rancher Support

[Rancher](http://rancher.com/) је комплетна container management платформа која Вам омогућава да на лак и једноставан начин користите контејнере.

* [verdaccio-rancher](https://github.com/lgaticaq/verdaccio-rancher)