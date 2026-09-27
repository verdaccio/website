---
id: kubernetes
title: 'Kubernetes'
description: 'Deploy Verdaccio on Kubernetes with the official Helm chart, including persistent storage and the configuration configMap.'
---

The recommended way to run Verdaccio on [Kubernetes](https://kubernetes.io) is the official
[Helm](https://helm.sh) chart, maintained at
[verdaccio/charts](https://github.com/verdaccio/charts).

:::tip Start from the worked example
The repository ships a complete, runnable example — a
[`values.yaml`](https://github.com/verdaccio/verdaccio/blob/master/docker-examples/v7/kubernetes/helm/values.yaml)
with its own [README](https://github.com/verdaccio/verdaccio/tree/master/docker-examples/v7/kubernetes/helm),
covering persistence, resource limits, an Ingress block ready to uncomment, and an inline
`config.yaml`. Copying that and editing it is usually faster than assembling the flags on
this page one at a time.

It is part of the
[Docker and Kubernetes examples](https://github.com/verdaccio/verdaccio/tree/master/docker-examples),
grouped by the major version they target: `v6` for the current stable line, `v7` for the next
major, `v9` for the experimental one. The example above pins the `7.x-next` image; change
`image.tag` to `6` to run the stable line instead.
:::

## Helm {#helm}

Helm **3** is what these instructions assume. It needs no cluster-side component — the
`helm init` and Tiller setup of Helm 2 is gone, and so is Helm 2 itself.

### Install {#install}

Deploy the Helm [verdaccio/verdaccio](https://github.com/verdaccio/charts)
chart.

### Add repository {#add-repository}

```
helm repo add verdaccio https://charts.verdaccio.org
```

In this example we use `npm` as release name:

```bash
helm install npm verdaccio/verdaccio
```

### Run locally with Helm {#run-locally-with-helm}

If you want to test Verdaccio with Helm on a local Kubernetes cluster, use the Verdaccio 7 Helm example in the repository:

[docker-examples/v7/kubernetes/helm](https://github.com/verdaccio/verdaccio/tree/master/docker-examples/v7/kubernetes/helm)

### Deploy a specific version {#deploy-a-specific-version}

`image.tag` selects the Verdaccio image, and pinning it is what you want in production:

```bash
helm install npm --set image.tag=7 verdaccio/verdaccio       # latest 7.x
helm install npm --set image.tag=6 verdaccio/verdaccio       # latest 6.x
helm install npm --set image.tag=6.10.3 verdaccio/verdaccio  # exactly this release
helm install npm --set image.tag=7.x-next verdaccio/verdaccio # nightly of the next major
```

See [Docker](docker.md#tagged-versions) for what each tag means.

### Upgrading Verdaccio {#upgrading-verdaccio}

```bash
helm upgrade npm verdaccio/verdaccio
```

### Uninstalling {#uninstalling}

```bash
helm uninstall npm
```

**Note:** this command delete all the resources, including packages that you may
have previously published to the registry.

### Custom Verdaccio configuration {#custom-verdaccio-configuration}

You can customize the Verdaccio configuration using a Kubernetes _configMap_.

#### Prepare {#prepare}

Copy the [existing configuration](https://github.com/verdaccio/verdaccio/blob/master/packages/config/src/conf/docker.yaml)
and adapt it for your use case:

```bash
wget https://raw.githubusercontent.com/verdaccio/verdaccio/master/packages/config/src/conf/docker.yaml -O config.yaml
```

**Note:** Make sure you are using the right path for the storage that is used for
persistency:

```yaml
storage: /verdaccio/storage/data
auth:
  htpasswd:
    file: /verdaccio/storage/htpasswd
```

#### Deploy the configMap {#deploy-the-configmap}

Deploy the `configMap` to the cluster

```bash
kubectl create configmap verdaccio-config --from-file ./config.yaml
```

#### Deploy Verdaccio {#deploy-verdaccio}

Now you can deploy the Verdaccio Helm chart and specify which configuration to
use:

```bash
helm install npm --set existingConfigMap=verdaccio-config verdaccio/verdaccio
```

### Authenticate with private upstreams using Helm

As of version `4.8.0` of the helm chart, a new `secretEnvVars` field has been added.  
This allows you to inject sensitive values to the container via a [Kubernetes Secret](https://kubernetes.io/docs/concepts/configuration/secret/).

1. Update your Verdaccio config according to the [Uplinks](./uplinks.md#auth-property) documentation
2. Pass the secret environment variable to your values file or via `--set secretEnvVars.FOO_TOKEN=superSecretBarToken`

```yaml
# values.yaml
secretEnvVars:
  FOO_TOKEN: superSecretBarToken
```

#### NGINX proxy body-size limit {#nginx-proxy-body-size-limit}

The standard k8s NGINX ingress proxy allows for 1MB for body-size which can be increased
by modifying the default deployment options according to the [documentation](https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/#custom-max-body-size):

```yaml
...

annotations:
...

    kubernetes.io/proxy-body-size: 20m
....
...

```

## Rancher Support {#rancher-support}

[Rancher](http://rancher.com/) is a complete container management platform that makes managing and using containers in production really easy.

- [verdaccio-rancher](https://github.com/lgaticaq/verdaccio-rancher)
