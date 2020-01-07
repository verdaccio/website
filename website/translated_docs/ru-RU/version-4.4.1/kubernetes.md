---
id: version-4.4.1-kubernetes
title: Kubernetes
original_id: kubernetes
---

 Вы можете найти инструкции для развёртывания Verdaccio на кластере Kubernetes в репозитории [verdaccio/docker-example](https://github.com/verdaccio/docker-examples/tree/master/kubernetes-example). Однако, рекомендуемым методом установки Verdaccio на кластер Kubernetes является использование [Helm](https://helm.sh). Helm это пакетный менеджер [Kubernetes](https://kubernetes.io) который даёт некоторые приемущества.

<div id="codefund">''</div>

## Helm

### Установка Helm

Если ранее вы не пользовались Helm, то вам потребуется настроить Helm контроллер называемый Tiller:

```bash
helm init
```

### Установка

Deploy the Helm [stable/verdaccio](https://github.com/kubernetes/charts/tree/master/stable/verdaccio) chart. In this example we use `npm` as release name:

```bash
helm install --name npm stable/verdaccio
```

### Установка конкретной версии

```bash
helm install --name npm --set image.tag=2.6.5 stable/verdaccio
```

### Обновление Verdaccio

```bash
helm upgrade npm stable/verdaccio
```

### Удаление

```bash
helm del --purge npm
```

**Note:** this command delete all the resources, including packages that you may have previously published to the registry.


### Пользовательская конфигурация Verdaccio

You can customize the Verdaccio configuration using a Kubernetes *configMap*.

#### Подготовка

Скопируйте [имеющуюся конфигурацию](https://github.com/verdaccio/verdaccio/blob/master/conf/docker.yaml) и адаптируйте её для себя:

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

#### Применение configMap

Для применения `configMap` к нашему кластеру

```bash
kubectl create configmap verdaccio-config --from-file ./config.yaml
```

#### Разворачивание Verdaccio

Сейчас вы можете развернуть Verdaccio Helm пакет и указать, с какой конфигурацией его нужно развернуть: use:

```bash
helm install --name npm --set customConfigMap=verdaccio-config stable/verdaccio
```

## Поддержка Rancher

[Rancher](http://rancher.com/) это платформа для управления конечными контейнерами, которая делает управление им и их использование в production реально простым.

* [verdaccio-rancher](https://github.com/lgaticaq/verdaccio-rancher)
