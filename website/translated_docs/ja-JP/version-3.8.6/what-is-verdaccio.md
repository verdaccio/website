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
    

![レジストリ](/svg/verdaccio_server.gif)

## Verdaccioの使用方法

VerdaccioはどんなNodeパッケージマネージャクライアントとでも簡単に使用できます。

![レジストリ](/svg/npm_install.gif)

カスタムレジストリを使用するには、以下のようにすべてのプロジェクトに対してグローバルに設定するか

    npm set registry http://localhost:4873
    

またはnpmでコマンドライン引数に`--registry`を指定してください (yarnではやや異なります)

    npm install lodash --registry http://localhost:4873
    

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
* `sinopia@1.4.0`から**フォーク**され、100%**後方互換性**があります。
* Verdaccioとは、**中世後期のイタリアでフレスコ画に使われていたポピュラーな緑色**を意味します。