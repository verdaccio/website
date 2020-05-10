---
id: version-4.6.0-kubernetes
title: Kubernetes
original_id: kubernetes
---

 Le istruzioni per sviluppare Verdaccio su un cluster Kubernetes si possono trovare nell'archivio [verdaccio/docker-example](https://github.com/verdaccio/docker-examples/tree/master/kubernetes-example). Tuttavia, il metodo raccomandato per l'installazione di Verdaccio su un cluster Kubernetes è di utilizzare [Helm](https://helm.sh). Helm è un gestore di pacchetti [Kubernetes](https://kubernetes.io) che trae molteplici vantaggi.

<div id="codefund">''</div>

## Helm

### Configurare Helm

Se non si è mai usato Helm prima d'ora, è necessario configurare il controller chiamato Tiller:

```bash
helm init
```

### Installazione

> ⚠️ If you are using this helm chart, please [be aware of the migration of the repository](https://github.com/verdaccio/verdaccio/issues/1767).

Deploy the Helm [verdaccio/verdaccio](https://github.com/verdaccio/charts) chart.

### Add repository

```
helm repo add verdaccio https://charts.verdaccio.org
```

In questo esempio usiamo `npm` come nome della release:

```bash
helm install --name npm verdaccio/verdaccio
```

### Sviluppare una versione specifica

```bash
helm install --name npm --set image.tag=3.13.1 verdaccio/verdaccio
```

### Aggiornamento di Verdaccio

```bash
helm upgrade npm verdaccio/verdaccio
```

### Disinstallazione

```bash
helm del --purge npm
```

**Note:** this command delete all the resources, including packages that you may have previously published to the registry.


### Configurazione personalizzata di Verdaccio

You can customize the Verdaccio configuration using a Kubernetes *configMap*.

#### Preparazione

Copiare la [configurazione esistente](https://github.com/verdaccio/verdaccio/blob/master/conf/docker.yaml) e adattarla al proprio caso d'uso:

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

#### Sviluppare il configMap

Sviluppare il `configMap` nel cluster

```bash
kubectl create configmap verdaccio-config --from-file ./config.yaml
```

#### Sviluppare Verdaccio

Ora è possibile sviluppare il grafico Verdaccio Helm e specificare quale configurazione utilizzare:

```bash
helm install --name npm --set customConfigMap=verdaccio-config verdaccio/verdaccio
```

## Supporto Rancher

[Rancher](http://rancher.com/) è una piattaforma completa per l'amministrazione di contenitori che rende estremamente semplice gestire ed utilizzare contenitori in produzione.

* [verdaccio-rancher](https://github.com/lgaticaq/verdaccio-rancher)
