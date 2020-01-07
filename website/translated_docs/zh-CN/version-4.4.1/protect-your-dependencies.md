---
id: version-4.4.1-protect-your-dependencies
title: 保护包
original_id: protect-your-dependencies（保护-依赖项）
---

`verdaccio` allows you protect publish, to achieve that you will need to set up correctly your [packages access](packages).

<div id="codefund">''</div>

### 包配置

例如，让我们一起来看以下设置。 您有一组前缀为`my-company-*`的依赖项，您要保护它们不让匿名或另一个没有正确证书的已登录用户使用。

```yaml
  'my-company-*':
    access: admin teamA teamB teamC
    publish: admin teamA
    proxy: npmjs
```

With this configuration, basically we allow to groups **admin** and **teamA** to *publish* and **teamA**   **teamB** **teamC** *access* to such dependencies.

### 用例：teamD试着访问此依赖项

So, if I am logged as **teamD**. I shouldn't be able to access all dependencies that match with `my-company-*` pattern.

```bash
➜ npm whoami
teamD
```
I won't have access to such dependencies and also won't be visible via web for user **teamD**. If I try to access the following will happen.

```bash
➜ npm install my-company-core
npm ERR! code E403
npm ERR! 403 Forbidden: webpack-1@latest
```
或者用`yarn`

```bash
➜ yarn add my-company-core
yarn add v0.24.6
info No lockfile found.
[1/4] 🔍  Resolving packages...
错误出现意外错误: "http://localhost:5555/webpack-1: 不允许未注册用户访问my-company-core包"。
```
