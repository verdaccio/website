---
id: kubernetes
title: "Kubernetes"
---

 Você pode encontrar instruções para implantar o Verdaccio em um cluster do Kubernetes no repositório [verdaccio/docker-example](https://github.com/verdaccio/docker-examples/tree/master/kubernetes-example). No entanto, o método recomendado para instalar o Verdaccio em um cluster de Kubernetes é usando [Helm](https://helm.sh). Helm é um gerenciador de pacotes do [Kubernetes](https://kubernetes.io) que traz múltiplas vantagens.

<div id="codefund">''</div>

## Helm

### Configurando o Helm

Se você nunca usou Helm antes, você precisará configurar o controlador do Helm chamado Tiller:

```bash
helm init
```

### Instalação

> ⚠️ If you are using this helm chart, please [be aware of the migration of the repository](https://github.com/verdaccio/verdaccio/issues/1767).

Deploy the Helm [verdaccio/verdaccio](https://github.com/verdaccio/charts) chart.

### Add repository

    helm repo add verdaccio https://charts.verdaccio.org
    

In this example we use `npm` as release name:

```bash
helm install --name npm verdaccio/verdaccio
```

### Implemente uma versão específica

```bash
helm install --name npm --set image.tag=3.13.1 verdaccio/verdaccio
```

### Atualizando o Verdaccio

```bash
helm upgrade npm verdaccio/verdaccio
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

#### Implementando o configMap

Implemente o `configMap` no cluster

```bash
kubectl create configmap verdaccio-config --from-file ./config.yaml
```

#### Lançando Verdaccio

Agora você pode lançar a tabela Verdaccio Helm e especificar qual configuração usar:

```bash
helm install --name npm --set customConfigMap=verdaccio-config verdaccio/verdaccio
```

## Suporte Rancher

[Rancher](http://rancher.com/) é uma plataforma completa de gerenciamento de contêineres que facilita o gerenciamento e o uso de contêineres na produção.

* [verdaccio-rancher](https://github.com/lgaticaq/verdaccio-rancher)