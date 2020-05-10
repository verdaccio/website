---
id: what-is-verdaccio
title: "O que é o Verdaccio?"
---

O Verdaccio é um **registro de proxy npm leve e privado** escrito em **Node.js** <iframe width="560" height="315" src="https://www.youtube.com/embed/hDIFKzmoCaA?enablejsapi=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen mark="crwd-mark"></iframe>

<div id="codefund">''</div>

## O que é um registro?

* Um repositório para pacotes que implementa a especificação **CommonJS Compliant Package Registry** para leitura de informações de pacote
* Fornecer uma API compatível com os clientes npm **(yarn/npm/pnpm)**
* Compatível com o versionamento semântico **(semver)**

    $> verdaccio
    

![registry](assets/verdaccio_server.gif)

## Usando o Verdaccio

O uso do verdaccio com qualquer cliente de gerenciador de pacotes de nó é muito simples.

![registry](assets/npm_install.gif)

Você pode usar um registro personalizado, seja definindo globalmente para todos os seus projetos

    npm set registry http://localhost:4873
    

ou por linha de comando como argumento `--registry` no npm (ligeiramente diferente em yarn)

    npm install lodash --registry http://localhost:4873
    

## Privado

Todos os pacotes que você publica são privados e apenas acessíveis com base em sua configuração.

## Proxy

Verdaccio armazena em cache todas as dependências por demanda e acelera as instalações em redes locais ou privadas.

## Verdaccio em poucas palavras

* É um aplicativo da web baseado no Node.js
* É um registro npm privado
* É um proxy de rede local
* É um aplicativo capaz de ser estendido por plugins
* É bastante fácil de instalar e usar
* Oferecemos suporte para Docker e Kubernetes
* É 100% compatível com yarn, npm e pnpm
* É um **fork** com base em `sinopia@1.4.0` e 100% **compatível com versões anteriores**.
* O nome Verdaccio vem de **um tom de verde popular na Itália medieval usado para afrescos**.