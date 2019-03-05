---
id: version-4.0.0-alpha.5-authentification
title: Yêu cầu xác thực
original_id: yêu cầu xác thực
---
The authentification is tied to the auth [plugin](plugins.md) you are using. The package restrictions also is handled by the [Package Access](packages.md).

The client authentification is handled by `npm` client itself. Once you login to the application:

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

Bạn có thể chọn gói phát hành ẩn danh khi sử dụng `verdaccio`, để bật chế độ này lên bạn cần cài đặt phần [quyền truy cập gói](packages.md) một cách chính xác.

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

Để đơn giản hóa quá trình cài đặt, `verdaccio` đã sử dụng plugin dựa trên tập tin `htpasswd`. Since version v3.0.x the `verdaccio-htpasswd` plugin is used by default.

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

Trường hợp bạn không muốn người dùng đăng nhập, bạn cài đặt `max_users: -1`.