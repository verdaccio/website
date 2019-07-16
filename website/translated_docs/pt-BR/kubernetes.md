---
id: kubernetes
title: "Kubernetes"
---

 Você pode encontrar instruções para implantar o Verdaccio em um cluster do Kubernetes no repositório [verdaccio/docker-example](https://github.com/verdaccio/docker-examples/tree/master/kubernetes-example). No entanto, o método recomendado para instalar o Verdaccio em um cluster de Kubernetes é usando [Helm](https://helm.sh). Helm é um gerenciador de pacotes do [Kubernetes](https://kubernetes.io) que traz múltiplas vantagens.

## Helm

### Configurar o Helm

Se você nunca usou Helm antes, você precisará configurar o controlador Helm chamado Tiller:

```bash
helm init
```

### Instalação

Implemente o gráfico Helm [stable/verdaccio](https://github.com/kubernetes/charts/tree/master/stable/verdaccio). Neste exemplo usamos `npm` como o nome de lançamento:

```bash
helm install --name npm stable/verdaccio
```

### Implemente uma versão específica

```bash
helm install --name npm --set image.tag=2.6.5 stable/verdaccio
```

### Atualizando o Verdaccio

```bash
helm upgrade npm stable/verdaccio
```

### Desinstalando

```bash
helm del --purge npm
```

**Nota:** este comando apaga todos os recursos, incluindo pacotes que você pode ter publicado anteriormente no registro.

### Configuração personalizada do Verdaccio

Você pode personalizar a configuração do Verdaccio usando um Kubernetes *configMap*.

#### Preparo

Copie a [configuração existente](https://github.com/verdaccio/verdaccio/blob/master/conf/docker.yaml) e adapte-a para o seu caso:

```bash
wget https://raw.githubusercontent.com/verdaccio/verdaccio/master/conf/docker.yaml -O config.yaml
```

**Nota:** Verifique se você está usando o caminho certo para o armazenamento usado pela persistência:

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