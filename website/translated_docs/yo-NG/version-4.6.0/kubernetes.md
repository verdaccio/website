---
id: version-4.6.0-kubernetes
title: Kubernetes
original_id: kubernetes
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

> ⚠️ If you are using this helm chart, please [be aware of the migration of the repository](https://github.com/verdaccio/verdaccio/issues/1767).

Deploy the Helm [verdaccio/verdaccio](https://github.com/verdaccio/charts) chart.

### Add repository

```
helm repo add verdaccio https://charts.verdaccio.org
```

Ninu apẹẹrẹ yii a lo `npm` gẹgẹbi orukọ ifilọlẹ:

```bash
helm install --name npm verdaccio/verdaccio
```

### Ṣamulo pato ẹya kan

```bash
helm install --name npm --set image.tag=3.13.1 verdaccio/verdaccio
```

### Sisagbega Verdaccio

```bash
helm upgrade npm verdaccio/verdaccio
```

### Yiyọ kuro

```bash
helm del --purge npm
```

**Note:** this command delete all the resources, including packages that you may have previously published to the registry.


### Akanṣe Iṣeto Verdaccio

You can customize the Verdaccio configuration using a Kubernetes *configMap*.

#### Gbaradi

Se adakọ [iṣeto titẹlẹ](https://github.com/verdaccio/verdaccio/blob/master/conf/docker.yaml) ki o si mu ṣe deede fun lilo ọrọ rẹ:

```bash
wget https://raw.githubusercontent.com/verdaccio/verdaccio/master/conf/docker.yaml -O config.yaml
```

**Note:** Make sure you are using the right path for the storage that is used for persistency:

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
helm install --name npm --set customConfigMap=verdaccio-config verdaccio/verdaccio
```

## Atilẹyin Rancher

[Rancher](http://rancher.com/) jẹ pilatifọọmu isakoso apoti pipe ti o n jẹ ki iṣakoso ati lilo awọn apoti ni iṣelọpọ rọrun gidi gan.

* [verdaccio-rancher](https://github.com/lgaticaq/verdaccio-rancher)
