---
id: yêu cầu xác thực
title: "Yêu cầu xác thực"
---

The authentification is tied to the auth [plugin](plugins.md) you are using. The package restrictions are also handled by the [Package Access](packages.md).

<div id="codefund">''</div>

Quá trình xác thực của khách hàng được xử lý bởi chính công cụ `npm`. Bạn có thể đăng nhập vào ứng dụng bằng lệnh sau:

```bash
npm adduser --registry http://localhost:4873
```

`npm` sẽ lưu Token được Verdaccio trả về trong tệp cấu hình, tệp này sẽ được lưu trữ trong thư mục chính của bạn. Để biết thêm thông tin về cấu hình `.npmrc`, vui lòng xem [ tài liệu chính thức ](https://docs.npmjs.com/files/npmrc).

```bash
cat .npmrc
registry=http://localhost:5555/
//localhost:5555/:_authToken="secretVerdaccioToken"
//registry.npmjs.org/:_authToken=secretNpmjsToken
```

#### Gói phát hành ẩn danh

`verdaccio` allows you to enable anonymous publish, to achieve that you will need to set up correctly your [packages access](packages.md).

Ví dụ:

```yaml
  'my-company-*':
    access: $anonymous
    publish: $anonymous
    proxy: npmjs
```

Như đã giải thích trong phần [issue #212](https://github.com/verdaccio/verdaccio/issues/212#issuecomment-308578500), kể từ phiên bản `npm@5.3.0` và trong tất cả các phiên bản phụ khác ** bạn sẽ không được phép xuất bản gói mà không có một token nào**.

## Understanding Groups

### The meaning of `$all` and `$anonymous`

As you know *Verdaccio* uses the `htpasswd` by default. That plugin does not implement the methods `allow_access`, `allow_publish` and `allow_unpublish`. Thus, *Verdaccio* will handle that in the following way:

* If you are not logged in (you are anonymous), `$all` and `$anonymous` means exactly the same.
* If you are logged in, `$anonymous` won't be part of your groups and `$all` will match any logged user. A new group `$authenticated` will be added to the list.

As a takeaway, `$all` **will match all users, independently whether is logged or not**.

**The previous behavior only applies to the default authentication plugin**. If you are using a custom plugin and such plugin implements `allow_access`, `allow_publish` or `allow_unpublish`, the resolution of the access depends on the plugin itself. Verdaccio will only set the default groups.

Let's recap:

* **logged**: `$all`, `$authenticated`, + groups added by the plugin
* **anonymous (logged out)**: `$all` and `$anonymous`.

## Tự động tạo tập tin htpasswd

In order to simplify the setup, `verdaccio` uses a plugin based on `htpasswd`. Since version v3.0.x the `verdaccio-htpasswd` plugin is used by default.

```yaml
auth:
  htpasswd:
    file: ./htpasswd
    # Maximum amount of users allowed to register, defaults to "+inf".
    # You can set this to -1 to disable registration.
    #max_users: 1000
```

| Thuộc tính | Phương thức | Yêu cầu | Ví dụ      | Hỗ trợ | Miêu tả                                      |
| ---------- | ----------- | ------- | ---------- | ------ | -------------------------------------------- |
| tập tin    | chuỗi       | Có      | ./htpasswd | tất cả | tập tin lưu trữ các thông tin đã được mã hóa |
| max_users  | số          | Không   | 1000       | tất cả | giới hạn người dùng                          |

In case you decide to not allow users to sign up, you can set `max_users: -1`.