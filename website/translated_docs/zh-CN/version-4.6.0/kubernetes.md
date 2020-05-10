---
id: version-4.6.0-kubernetes
title: Kubernetes
original_id: kubernetes
---

 您可以在[verdaccio/docker-例子](https://github.com/verdaccio/docker-examples/tree/master/kubernetes-example)资源库找到在Kubernetes群集中配置Verdaccio的指南。 然而，建议在Kubernetes集群上安装Verdaccio的方法是使用[Helm](https://helm.sh)。 Helm 是 [Kubernetes](https://kubernetes.io) 包管理者，它带来很多优点。

<div id="codefund">''</div>

## Helm

### 设置Helm

如果您以前没有使用过Helm，您需要设置叫做Tiller的Helm控制器:

```bash
helm init
```

### 安装

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

### 配置特定版本

```bash
helm install --name npm --set image.tag=3.13.1 verdaccio/verdaccio
```

### 升级Verdaccio

```bash
helm upgrade npm verdaccio/verdaccio
```

### 卸载

```bash
helm del --purge npm
```

**Note:** this command delete all the resources, including packages that you may have previously published to the registry.


### 自定义Verdaccio 配置

You can customize the Verdaccio configuration using a Kubernetes *configMap*.

#### 准备

Copy the [existing configuration](https://github.com/verdaccio/verdaccio/blob/master/conf/docker.yaml) and adapt it for your use case:

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

#### 配置configMap

配置`configMap`到集群

```bash
kubectl create configmap verdaccio-config --from-file ./config.yaml
```

#### 配置Verdaccio

现在您可以配置Verdaccio Helm chart 并指定使用哪个配置:

```bash
helm install --name npm --set customConfigMap=verdaccio-config verdaccio/verdaccio
```

## Rancher 支持

[Rancher](http://rancher.com/) 是一个完整的容器管理平台，它使得在生产中管理和使用容器非常容易。

* [verdaccio-rancher](https://github.com/lgaticaq/verdaccio-rancher)
