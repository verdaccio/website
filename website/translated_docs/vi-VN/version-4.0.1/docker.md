---
id: version-4.0.1-docker
title: Docker
original_id: docker
---

![alt Docker Pulls Count](http://dockeri.co/image/verdaccio/verdaccio "Docker Pulls Count")

Để tải [hình ảnh docker mới nhất](https://hub.docker.com/r/verdaccio/verdaccio/):

```bash
docker pull verdaccio/verdaccio
```

![Docker pull](assets/docker_verdaccio.gif)

<div id="codefund">''</div>

## Những phiên bản thẻ

Bắt đầu với phiên bản `v2.x`, bạn có thể tải những hình ảnh này qua [tag](https://hub.docker.com/r/verdaccio/verdaccio/tags/), cụ thể như sau:

Đối với phiên bản chính:

```bash
docker pull verdaccio/verdaccio:4
```

Đối với phiên bản phụ:

```bash
docker pull verdaccio/verdaccio:4.0
```

Đối với một phiên bản (bản vá) cụ thể:

```bash
docker pull verdaccio/verdaccio:4.0.0
```

> Nếu bạn quan tâm đến danh sách thẻ, hãy [truy cập trang web Docker](https://hub.docker.com/r/verdaccio/verdaccio/tags/).

## Running Verdaccio using Docker

Để chạy vùng chứa docker:

```bash
docker run -it --rm --name verdaccio -p 4873:4873 verdaccio/verdaccio
```

The last argument defines which image to use. The above line will pull the latest prebuilt image from dockerhub, if you haven't done that already.

Khi bạn muốn tạo [một bản sao cục bộ](#build-your-own-docker-image) hãy dùng `verdaccio` làm tham số cuối cùng.

Bạn có thể sử dụng `-v` để liên kết với `conf`, `storage` và `plugins` với hệ thống tệp host:

```bash
V_PATH=/path/for/verdaccio; docker run -it --rm --name verdaccio \
  -p 4873:4873 \
  -v $V_PATH/conf:/verdaccio/conf \
  -v $V_PATH/storage:/verdaccio/storage \
  -v $V_PATH/plugins:/verdaccio/plugins \
  verdaccio/verdaccio
```

> Note: Verdaccio runs as a non-root user (uid=10001) inside the container, if you use bind mount to override default, you need to make sure the mount directory is assigned to the right user. In above example, you need to run `sudo chown -R 10001:65533 /opt/verdaccio` otherwise you will get permission errors at runtime. Chúng tôi khuyên bạn nên [ sử dụng khối lượng docker](https://docs.docker.com/storage/volumes/) thay vì cài đặt bắt buộc.

Verdaccio 4 provides a new set of environment variables to modify either permissions, port or http protocol. Here the complete list:

| Thuộc tính            | default                | Miêu tả                                            |
| --------------------- | ---------------------- | -------------------------------------------------- |
| VERDACCIO_APPDIR      | `/opt/verdaccio-build` | the docker working directory                       |
| VERDACCIO_USER_NAME | `verdaccio`            | the system user                                    |
| VERDACCIO_USER_UID  | `10001`                | the user id being used to apply folder permissions |
| VERDACCIO_PORT        | `4873`                 | the verdaccio port                                 |
| VERDACCIO_PROTOCOL    | `http`                 | the default http protocol                          |

### Plugins

Những phần mềm bổ trợ có thể được cài đặt trong một thư mục riêng biệt và được gắn với Docker hoặc Kubernetes, tuy nhiên, bạn nên đảm bảo việc tạo các phần mềm bổ trợ bằng cách sử dụng các phụ thuộc cục bộ của cùng một dữ liệu hình ảnh như Verdaccio Dockerfile.

```docker
FROM verdaccio/verdaccio

RUN npm install verdaccio-s3-storage
```

### Docker và cấu hình cổng tùy chỉnh

Any `host:port` configured in `conf/config.yaml` under `listen` **is currently ignored when using docker**.

If you want to reach Verdaccio docker instance under different port, lets say `5000` in your `docker run` command add the environment variable `VERDACCIO_PORT=5000` and then expose the port `-p 5000:5000`.

```bash
V_PATH=/path/for/verdaccio; docker run -it --rm --name verdaccio \
  -e "VERDACCIO_PORT=8080" -p 8080:8080 \  
  verdaccio/verdaccio
```

Of course the numbers you give to `-p` paremeter need to match.

### Sử dụng HTTPS trong Docker

Bạn có thể cài đặt cấu hình giao thức tương tự như cấu hình cổng mà verdaccio sẽ sử dụng. Sau khi bạn xác định certificate trong config.yaml, bạn phải ghi đè giá trị mặc định ("http") trong biến môi trường ` PROTOCOL ` bằng "https".

```bash
docker run -it --rm --name verdaccio \
  --env "VERDACCIO_PROTOCOL=https" -p 4873:4873
  verdaccio/verdaccio
```

### Sử dụng docker-compose

1. Tải phiên bản mới nhất của [docker-compose](https://github.com/docker/compose).
2. Tạo và chạy vùng chứa:

```bash
$ docker-compose up --build
```

You can set the port to use (for both container and host) by prefixing the above command with `VERDACCIO_PORT=5000`.

```yaml
version: '3.1'

services:
  verdaccio:
    image: verdaccio/verdaccio
    container_name: "verdaccio"
    networks:

      - node-network
    environment:
      - VERDACCIO_PORT=4873
    ports:
      - "4873:4873"
    volumes:
      - "./storage:/verdaccio/storage"
      - "./config:/verdaccio/conf"
      - "./plugins:/verdaccio/plugins"  
networks:
  node-network:
    driver: bridge
```

Docker sẽ tạo ra một ổ đĩa có tên là lưu trữ dữ liệu ứng dụng liên tục. Bạn có thể sử dụng `docker inspect` hoặc `docker volume inspect` để xác định vị trí thực của ổ đĩa này và chỉnh sửa cấu hình, ví dụ như:

```bash
$ docker volume inspect verdaccio_verdaccio
[
    {
        "Name": "verdaccio_verdaccio",
        "Driver": "local",
        "Mountpoint": "/var/lib/docker/volumes/verdaccio_verdaccio/_data",
        "Labels": null,
        "Scope": "local"
    }
]

```

## Tạo hình ảnh Docker của riêng bạn

```bash
docker build -t verdaccio .
```

Ngoài ra còn có một script npm để tạo ra một hình ảnh docker, vì vậy bạn cũng có thể làm như sau:

```bash
yarn run build:docker
```

Xin lưu ý rằng việc tạo hình ảnh đầu tiên mất vài phút vì nó cần phải chạy `npm install` và khi bạn thay đổi bất cứ điều gì vào bất kỳ lúc nào và không được liệt kê trong `.dockerignore` thì sẽ mất một thời gian dài để chạy các tập tin này.

Lưu ý rằng bạn cần phải cài đặt docker trên máy của bạn để thực hiện bất kỳ lệnh docker nào ở trên, docker executable phải nằm trong `$PATH` của bạn.

## Docket ví dụ

Có một kho lưu trữ riêng biệt lưu nhiều cấu hình để tạo hình ảnh Docker với `verdaccio`, ví dụ như đối với reverse proxy:

<https://github.com/verdaccio/docker-examples>

## Tạo tùy chỉnh Docker

> If you have made an image based on Verdaccio, feel free to add it to this list.

* [docker-verdaccio-gitlab](https://github.com/snics/docker-verdaccio-gitlab)
* [docker-verdaccio](https://github.com/deployable/docker-verdaccio)
* [docker-verdaccio-s3](https://github.com/asynchrony/docker-verdaccio-s3) Private NPM container that can backup to s3
* [docker-verdaccio-ldap](https://github.com/snadn/docker-verdaccio-ldap)
* [verdaccio-ldap](https://github.com/nathantreid/verdaccio-ldap)
* [verdaccio-compose-local-bridge](https://github.com/shingtoli/verdaccio-compose-local-bridge)
* [docker-verdaccio](https://github.com/Global-Solutions/docker-verdaccio)
* [verdaccio-docker](https://github.com/idahobean/verdaccio-docker)
* [verdaccio-server](https://github.com/andru255/verdaccio-server)
* [coldrye-debian-verdaccio](https://github.com/coldrye-docker/coldrye-debian-verdaccio) docker image providing verdaccio from coldrye-debian-nodejs.