---
id: version-4.0.0-alpha.4-uplinks
title: 上行链路
original_id: uplinks（上行链路）
---
*上行链路* 是指可以访问到外部包的外部注册服务器地址。

![上行链路](https://user-images.githubusercontent.com/558752/52976233-fb0e3980-33c8-11e9-8eea-5415e6018144.png)

### 使用

```yaml
uplinks:
  npmjs:
   url: https://registry.npmjs.org/
  server2:
    url: http://mirror.local.net/
    timeout: 100ms
  server3:
    url: http://mirror2.local.net:9000/
  baduplink:
    url: http://localhost:55666/
```

### 配置

You can define mutiple uplinks and each of them must have an unique name (key). They can have two properties:

| 属性           | 类型      | 必填 | 示例                                      | 支持     | 描述                                                                                                          | 默认值   |
| ------------ | ------- | -- | --------------------------------------- | ------ | ----------------------------------------------------------------------------------------------------------- | ----- |
| url          | 字符串     | 是  | https://registry.npmjs.org/             | 任意路径   | 外部注册服务器URL                                                                                                  | npmjs |
| ca           | 字符串     | 否  | ~./ssl/client.crt'                      | 任意路径   | SSL证书文件路径                                                                                                   | 无默认值  |
| timeout      | 字符串     | 否  | 100ms                                   | 任意路径   | 为请求设置新的超时时间                                                                                                 | 30s   |
| maxage       | 字符串     | 否  | 10m                                     | 任意路径   | 请求返回信息时效，在此时间内不会发起相同的请求                                                                                     | 2m    |
| fail_timeout | 字符串     | 否  | 10m                                     | 任意路径   | 请求在连续失败超过指定次数后的最长等待重试时间                                                                                     | 5m    |
| max_fails    | 数字      | 否  | 2                                       | 任意路径   | 请求返回信息时效，在此时间内不会发起相同的请求                                                                                     | 2     |
| cache        | boolean | 否  | [true,false]                            | >= 2.1 | 缓存下载的远程tarball文件到本地                                                                                         | true  |
| auth         | list    | 否  | [见下文](uplinks.md#auth-property)         | >= 2.5 | 指定“授权authorization”请求头的内容 [详情见](http://blog.npmjs.org/post/118393368555/deploying-with-npm-private-modules) | 禁用    |
| headers      | list    | 否  | authorization: "Bearer SecretJWToken==" | 任意路径   | 上行链路请求的请求头header列表                                                                                          | 禁用    |
| strict_ssl   | boolean | 否  | [true,false]                            | >= 3.0 | 为true时，会检测SSL证书的有效性                                                                                         | true  |

#### Auth属性

The `auth` property allows you to use an auth token with an uplink. Using the default environment variable:

```yaml
uplinks:
  private:
    url: https://private-registry.domain.com/registry
    auth:
      type: bearer
      token_env: true # defaults to `process.env['NPM_TOKEN']`
```

或者使用一个指定的环境变量

```yaml
uplinks:
  private:
    url: https://private-registry.domain.com/registry
    auth:
      type: bearer
      token_env: FOO_TOKEN
```

`token_env: FOO_TOKEN`内部将使用 `process.env['FOO_TOKEN']`

或者直接指定令牌:

```yaml
uplinks:
  private:
    url: https://private-registry.domain.com/registry
    auth:
      type: bearer
      token: "token"
```

> 注意: `token`的优先级高于`token_env`

### 须知

* Uplinks must be registries compatible with the `npm` endpoints. Eg: *verdaccio*, `sinopia@1.4.0`, *npmjs registry*, *yarn registry*, *JFrog*, *Nexus* and more.
* Setting `cache` to false will help to save space in your hard drive. This will avoid store `tarballs` but [it will keep metadata in folders](https://github.com/verdaccio/verdaccio/issues/391).
* Exceed with multiple uplinks might slow down the lookup of your packages due for each request a npm client does, verdaccio does 1 call for each uplink.
* The (timeout, maxage and fail_timeout) format follow the [NGINX measurement units](http://nginx.org/en/docs/syntax.html)