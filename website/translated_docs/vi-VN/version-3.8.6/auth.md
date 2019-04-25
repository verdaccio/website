---
id: version-3.8.6-authentification
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

Như đã giải thích trong phần [issue #212](https://github.com/verdaccio/verdaccio/issues/212#issuecomment-308578500), kể từ phiên bản `npm@5.3.0` và trong tất cả các phiên bản phụ khác ** bạn sẽ không được phép xuất bản gói mà không có một token nào**. Tuy nhiên đối với công cụ quản lý thư viện `yarn` thì không có yêu cầu này.

## Tự động tạo tập tin htpasswd

Để đơn giản hóa quá trình cài đặt, `verdaccio` đã sử dụng plugin dựa trên tập tin `htpasswd`. [Plugin bên ngoài](https://github.com/verdaccio/verdaccio-htpasswd) đã được cài đặt mặc định trong phiên bản v3.0.x. V2.x của gói này vẫn chứa phiên bản tích hợp của plugin này.

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