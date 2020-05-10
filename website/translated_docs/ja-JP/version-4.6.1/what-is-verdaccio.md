---
id: version-4.6.1-what-is-verdaccio
title: Veridaccio とは？
original_id: what-is-verdaccio
---

Verdaccio is a **lightweight private npm proxy registry** built in **Node.js**
<iframe width="560" height="315" src="https://www.youtube.com/embed/hDIFKzmoCaA?enablejsapi=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen mark="crwd-mark"></iframe>
<div id="codefund">''</div>

## レジストリとは？

* A repository for packages that implements the **CommonJS Compliant Package Registry specification** for reading package info
* Provide an API compatible with npm clients **(yarn/npm/pnpm)**
* Follow the semantic Versioning compatible **(semver)**

```
$> verdaccio
```

![レジストリ](assets/verdaccio_server.gif)

## Verdaccioの使用方法

VerdaccioはどんなNodeパッケージマネージャクライアントとでも簡単に使用できます。

![レジストリ](assets/npm_install.gif)

カスタムレジストリを使用するには、以下のようにすべてのプロジェクトに対してグローバルに設定するか

```
npm set registry http://localhost:4873
```

またはnpmでコマンドライン引数に`--registry`を指定してください (yarnではやや異なります)

```
npm install lodash --registry http://localhost:4873
```

## プライベート

Verdaccioにpublishしたパッケージはすべて非公開で、アクセスできるのは設定に基づくクライアントだけです。

## プロキシ

Verdaccioは、必要に応じてすべての依存関係をキャッシュし、ローカルまたはプライベートネットワークでのインストールを高速化します。

## Verdaccioとは何か

* Node.js上で動作するWebアプリ
* プライベートnpmレジストリ
* ローカルネットワークプロキシ
* プラグイン対応のアプリケーション
* とても簡単にインストールして使用できます
* DockerとKubernetesのサポートを提供しています
* yarn、npm、pnpmと100％互換性があります
* It was **forked** based on `sinopia@1.4.0` and 100% **backward compatible**.
* Verdaccio means **A green color popular in late medieval Italy for fresco painting**.
