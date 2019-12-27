---
id: kubernetes
title: "Kubernetes"
---

 O le ri awọn itọnisọna lati samulo Verdaccio lori iṣupọ Kubernetes kan lori ibi ipamọ [verdaccio/docker-example](https://github.com/verdaccio/docker-examples/tree/master/kubernetes-example). Amọ sa, ọna fifi Verdaccio sori iṣupọ Kubernetes kan ti a ṣe ni igbaniyanju ni lati lo [Helm](https://helm.sh). Helm jẹ [Kubernetes](https://kubernetes.io) oluṣakoso akopọ ti o mu ọpọ awọn anfani wa.

<div id="codefund">''</div>

## Helm

### Ṣeto Helm

Ti o ko ba ti lo Helm ri tẹlẹ, o nilo lati ṣeto oludari Helm ti a pe ni Tiller:

```bash
helm init
```

### Fi sori ẹrọ

Samulo Helm atẹ [stable/verdaccio](https://github.com/kubernetes/charts/tree/master/stable/verdaccio). Ninu apẹẹrẹ yii a lo `npm` gẹgẹbi orukọ igbejade:

```bash
helm install --name npm stable/verdaccio
```

### Ṣamulo pato ẹya kan

```bash
helm install --name npm --set image.tag=2.6.5 stable/verdaccio
```

### Sisagbega Verdaccio

```bash
helm upgrade npm stable/verdaccio
```

### Yiyọ kuro

```bash
helm del --purge npm
```

**Akiyesi:** aṣẹ yi n pa gbogbo awọn ohun elo rẹ, pẹlu awọn akopọ ti o le ti gbejade tẹlẹ si ibi iforukọsilẹ naa.

### Akanṣe Iṣeto Verdaccio

O le ṣe iṣeto Verdaccio ni akanṣe pẹlu lilo Kubernetes *configMap*.

#### Gbaradi

Se adakọ [iṣeto titẹlẹ](https://github.com/verdaccio/verdaccio/blob/master/conf/docker.yaml) ki o si mu ṣe deede fun lilo ọrọ rẹ:

```bash
wget https://raw.githubusercontent.com/verdaccio/verdaccio/master/conf/docker.yaml -O config.yaml
```

**Akiyesi:** Ri daju pe o n lo ọna ti o tọ fun ibi ipamọ ti o jẹ lilo fun aiduro:

```yaml
storage: /verdaccio/storage/data
auth:
  htpasswd:
    file: /verdaccio/storage/htpasswd
```

#### Ṣamulo configMap naa

Ṣamulo `configMap` si iṣupọ naa

```bash
kubectl create configmap verdaccio-config --from-file ./config.yaml
```

#### Samulo Verdaccio

Ni bayi o le ṣe amulo atẹ Verdaccio Helm ati ṣiṣe pato iru iṣeto to ma jẹ lilo:

```bash
helm install --name npm --set customConfigMap=verdaccio-config stable/verdaccio
```

## Atilẹyin Rancher

[Rancher](http://rancher.com/) jẹ pilatifọọmu isakoso apoti pipe ti o n jẹ ki iṣakoso ati lilo awọn apoti ni iṣelọpọ rọrun gidi gan.

* [verdaccio-rancher](https://github.com/lgaticaq/verdaccio-rancher)