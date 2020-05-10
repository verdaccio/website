---
id: version-4.6.0-kubernetes
title: Kubernetes
original_id: kubernetes
---

 Možete naći uputstva kako da izvršite deploy Verdaccio-a na Kubernetes klaster u [verdaccio/docker-example](https://github.com/verdaccio/docker-examples/tree/master/kubernetes-example) repozitorijumu. Ipak, preporučujemo da instalirate Verdaccio na Kubernetes klaster tako što ćete koristiti [Helm](https://helm.sh). Helm je [Kubernetes](https://kubernetes.io) package manager koji donosi mnoge pogodnosti.

<div id="codefund">''</div>

## Helm

### Setup Helm

Ako ranije niste koristili Helm, potrebno je da podesite Helm kontroler zvani Tiller:

```bash
helm init
```

### Instaliranje

> ⚠️ If you are using this helm chart, please [be aware of the migration of the repository](https://github.com/verdaccio/verdaccio/issues/1767).

Deploy the Helm [verdaccio/verdaccio](https://github.com/verdaccio/charts) chart.

### Add repository

```
helm repo add verdaccio https://charts.verdaccio.org
```

U ovom primeru koristimo `npm` kao ime izdanja:

```bash
helm install --name npm verdaccio/verdaccio
```

### Postavljanje specifične verzije (deploy)

```bash
helm install --name npm --set image.tag=3.13.1 verdaccio/verdaccio
```

### Nadogradjivanje Verdaccio-a

```bash
helm upgrade npm verdaccio/verdaccio
```

### Deinstaliranje

```bash
helm del --purge npm
```

**Note:** this command delete all the resources, including packages that you may have previously published to the registry.


### Korisnička Konfiguracija Verdaccio-a

You can customize the Verdaccio configuration using a Kubernetes *configMap*.

#### Priprema

Copy the [existing configuration](https://github.com/verdaccio/verdaccio/blob/master/conf/docker.yaml) and adapt it for your use case:

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

#### Postavljanje configMap (deploy)

Postavite `configMap` na klaster

```bash
kubectl create configmap verdaccio-config --from-file ./config.yaml
```

#### Postavite Verdaccio

Sada možete postaviti Verdaccio Helm chart i detaljno definisati konfiguraciju da koristi:

```bash
helm install --name npm --set customConfigMap=verdaccio-config verdaccio/verdaccio
```

## Rancher Support

[Rancher](http://rancher.com/) je kompletna container management platforma koja Vam omogućava da na lak i jednostavan način koristite kontejnere.

* [verdaccio-rancher](https://github.com/lgaticaq/verdaccio-rancher)
