---
id: version-4.6.0-kubernetes
title: Kubernetes
original_id: kubernetes
---

 Bạn có thể tìm thấy cách sử dụng Verdaccio trong phần lưu trữ Kubernetes ở [verdaccio/docker-example](https://github.com/verdaccio/docker-examples/tree/master/kubernetes-example). Tuy nhiên, cách cài đặt chúng tôi gợi ý cho bạn để chạy Verdaccio trên phần lưu trữ Kubernetes là sử dụng [Helm](https://helm.sh). Vì Helm là một trình quản lý gói [ Kubernetes ](https://kubernetes.io) có nhiều ưu điểm.

<div id="codefund">''</div>

## Helm

### Cài đặt Helm

Nếu trước đây bạn chưa từng sử dụng Helm, bạn cần tạo bộ điều khiển Helm có tên là Tiller:

```bash
helm init
```

### Cài đặt

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

### Sử dụng cấu hình phiên bản cụ thể

```bash
helm install --name npm --set image.tag=3.13.1 verdaccio/verdaccio
```

### Nâng cấp Verdaccio

```bash
helm upgrade npm verdaccio/verdaccio
```

### Gỡ cài đặt

```bash
helm del --purge npm
```

**Note:** this command delete all the resources, including packages that you may have previously published to the registry.


### Tùy chỉnh cấu hình Verdaccio

You can customize the Verdaccio configuration using a Kubernetes *configMap*.

#### Chuẩn bị

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

#### Cài đặt sử dụng configMap

Cài đặt `configMap` trong cụm máy tính

```bash
kubectl create configmap verdaccio-config --from-file ./config.yaml
```

#### Cài đặt sử dụng cấu hình Verdaccio

Bây giờ bạn có thể cài đặt cấu hình biểu đồ Verdaccio Helm và chỉ định cấu hình nào sẽ sử dụng:

```bash
helm install --name npm --set customConfigMap=verdaccio-config verdaccio/verdaccio
```

## Sữ hữu dụng của Rancher

[Rancher](http://rancher.com/) là một nền tảng quản lý vùng chứa hoàn chỉnh giúp dễ dàng quản lý và sử dụng vùng chứa trong khi hoạt động.

* [verdaccio-rancher](https://github.com/lgaticaq/verdaccio-rancher)
