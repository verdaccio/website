---
id: kubernetes
title: "Kubernetes"
---

 Você pode encontrar instruções para implantar o Verdaccio em um cluster do Kubernetes no repositório [verdaccio/docker-example](https://github.com/verdaccio/docker-examples/tree/master/kubernetes-example). No entanto, o método recomendado para instalar o Verdaccio em um cluster de Kubernetes é usando [Helm](https://helm.sh). Helm é um gerenciador de pacotes do [Kubernetes](https://kubernetes.io) que traz múltiplas vantagens.

## Helm

### Setup Helm

If you haven't used Helm before, you need to setup the Helm controller called Tiller:

```bash
helm init
```

### Install

Deploy the Helm [stable/verdaccio](https://github.com/kubernetes/charts/tree/master/stable/verdaccio) chart. In this example we use `npm` as release name:

```bash
helm install --name npm stable/verdaccio
```

### Deploy a specific version

```bash
helm install --name npm --set image.tag=2.6.5 stable/verdaccio
```

### Upgrading Verdaccio

```bash
helm upgrade npm stable/verdaccio
```

### Uninstalling

```bash
helm del --purge npm
```

**Note:** this command delete all the resources, including packages that you may have previously published to the registry.

### Custom Verdaccio configuration

You can customize the Verdaccio configuration using a Kubernetes *configMap*.

#### Prepare

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

#### Deploy the configMap

Deploy the `configMap` to the cluster

```bash
kubectl create configmap verdaccio-config --from-file ./config.yaml
```

#### Deploy Verdaccio

Now you can deploy the Verdaccio Helm chart and specify which configuration to use:

```bash
helm install --name npm --set customConfigMap=verdaccio-config stable/verdaccio
```

## Rancher Support

[Rancher](http://rancher.com/) is a complete container management platform that makes managing and using containers in production really easy.

* [verdaccio-rancher](https://github.com/lgaticaq/verdaccio-rancher)