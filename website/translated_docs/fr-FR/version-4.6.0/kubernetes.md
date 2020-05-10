---
id: version-4.6.0-kubernetes
title: Kubernetes
original_id: kubernetes
---

 Les instructions pour développer Verdaccio sur un cluster Kubernetes sont disponibles dans l’archive [verdaccio/docker-example](https://github.com/verdaccio/docker-examples/tree/master/kubernetes-example). Cependant, la méthode recommandée pour installer Verdaccio sur un cluster Kubernetes consiste à utiliser [Helm](https://helm.sh). Helm est un [Kubernetes](https://kubernetes.io) gestionnaire de paquets, qui présente de nombreux avantages.

<div id="codefund">''</div>

## Helm

### Configurer Helm

Si vous n'avez jamais utilisé Helm, vous devez configurer le contrôleur Helm dit Tiller:

```bash
helm init
```

### Installer

> ⚠️ If you are using this helm chart, please [be aware of the migration of the repository](https://github.com/verdaccio/verdaccio/issues/1767).

Deploy the Helm [verdaccio/verdaccio](https://github.com/verdaccio/charts) chart.

### Add repository

```
helm repo add verdaccio https://charts.verdaccio.org
```

In this example we use `npm` as release name:

```bash
helm install --name npm verdaccio/verdaccio
```

### Déployer une version spécifique

```bash
helm install --name npm --set image.tag=3.13.1 verdaccio/verdaccio
```

### En cours de mettre Verdaccio à niveau

```bash
helm upgrade npm verdaccio/verdaccio
```

### Désinstallation

```bash
helm del --purge npm
```

**Note:** this command delete all the resources, including packages that you may have previously published to the registry.


### Configuration personnalisée de Verdaccio

You can customize the Verdaccio configuration using a Kubernetes *configMap*.

#### Préparer

Copier la [configuration existante](https://github.com/verdaccio/verdaccio/blob/master/conf/docker.yaml) et l'adapter à votre cas d'utilisation :

```bash
wget https://raw.githubusercontent.com/verdaccio/verdaccio/master/conf/docker.yaml -O config.yaml
```

**Note:** Make sure you are using the right path for the storage that is used for persistency:

```yaml
torage: /verdaccio/storage/data
auth:
  htpasswd:
    file: /verdaccio/storage/htpasswd
```

#### Développer le configMap

Développer le `configMap` dans le cluster

```bash
kubectl create configmap verdaccio-config --from-file ./config.yaml
```

#### Développer Verdaccio

Maintenant, vous pouvez développer le tableau Verdaccio Helm et spécifier la configuration à utiliser:

```bash
helm install --name npm --set customConfigMap=verdaccio-config verdaccio/verdaccio
```

## Support Rancher

[Rancher](http://rancher.com/) est une plate-forme complète de gestion de conteneurs facilitant la gestion et l'utilisation des conteneurs en production.

* [verdaccio-rancher](https://github.com/lgaticaq/verdaccio-rancher)