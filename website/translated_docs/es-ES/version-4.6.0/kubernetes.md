---
id: version-4.6.0-kubernetes
title: Kubernetes
original_id: kubernetes
---

 Puedes encontrar las instrucciones para desplegar Verdaccio en un cluster de Kubernetes en el repositorio [verdaccio/docker-example](https://github.com/verdaccio/docker-examples/tree/master/kubernetes-example). Sin embargo, el método recomendado de instalar Verdaccio en un cluster de Kubernetes es usando [Helm](https://helm.sh). Helm is a [Kubernetes](https://kubernetes.io) es un administrador de paquetes que trae muchos beneficios y ventajas.

<div id="codefund">''</div>

## Helm

### Configurar Helm

Si no has usado Helm anteriormente, necesitarás configurar el controlador de Helm llamado Tiller:

```bash
helm init
```

### Instalación

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

### Desplegar una versión específica

```bash
helm install --name npm --set image.tag=3.13.1 verdaccio/verdaccio
```

### Actualizando Verdaccio

```bash
helm upgrade npm verdaccio/verdaccio
```

### Desinstalar

```bash
helm del --purge npm
```

**Note:** this command delete all the resources, including packages that you may have previously published to the registry.


### Configuración personalizada de Verdaccio

You can customize the Verdaccio configuration using a Kubernetes *configMap*.

#### Preparando

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

#### Desplegar el configMap

Desplegar el ` configMap` en el cluster

```bash
kubectl create configmap verdaccio-config --from-file ./config.yaml
```

#### Desplegar Verdaccio

Ahora puedes desplegar Verdaccio Helm chart y especificar cual configuración usar:

```bash
helm install --name npm --set customConfigMap=verdaccio-config verdaccio/verdaccio
```

## Soporte Rancher

[Rancher](http://rancher.com/) es una completa plataforma para la administración de contenedores en producción muy fácil de usar.

* [verdaccio-rancher](https://github.com/lgaticaq/verdaccio-rancher)
