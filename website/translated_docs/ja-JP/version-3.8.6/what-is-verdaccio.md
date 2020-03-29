---
id: version-3.8.6-what-is-verdaccio
title: Veridaccio とは？
original_id: what-is-verdaccio
---

Verdaccioは、**Node.js**で構築された**軽量なプライベートnpmプロキシレジストリ**です。

## レジストリとは？

* パッケージ情報を読み込むために **CommonJS パッケージレジストリ仕様に準拠した** パッケージリポジトリです
* npm クライアント **(yarn/npm/pnpm)** と互換性のある API を提供します
* セマンティックバージョニング **(semver)** に従います

    $> verdaccio
    

![registry](/svg/verdaccio_server.gif)

## Verdaccioの使用方法

VerdaccioはどんなNodeパッケージマネージャクライアントとでも簡単に使用できます。

![registry](/svg/npm_install.gif)

カスタムレジストリを使用するには、以下のようにすべてのプロジェクトに対してグローバルに設定するか

    npm set registry http://localhost:4873
    

またはnpmでコマンドライン引数に`--registry`を指定してください (yarnではやや異なります)

    npm install lodash --registry http://localhost:4873
    

## プライベート

All packages that you publish are private and only accessible based in your configuration.

## Proxy

Verdaccio cache all dependencies by demand and speed up installations in local or private networks.

## Verdaccio in a nutshell

* It's a web app based on Node.js
* It's a private npm registry
* It's a local network proxy
* It's a Pluggable application
* It's a fairly easy install and use
* We offer Docker and Kubernetes support
* It is 100% compatible with yarn, npm and pnpm
* It was **forked** based on `sinopia@1.4.0` and 100% **backward compatible**.
* Verdaccio means **A green color popular in late medieval Italy for fresco painting**.