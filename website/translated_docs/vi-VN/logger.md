---
id: logger
title: "Logger"
---

Cũng như bất kỳ ứng dụng web nào, verdaccio có trình ghi nhật ký tích hợp tùy chỉnh. Bạn có thể lựa chọn nhiều loại đầu ra.

```yaml
logs:
  # console output
  - {type: stdout, format: pretty, level: http}
  # file output
  - {type: file, path: verdaccio.log, level: info}
  # Rotating log stream. Options are passed directly to bunyan. See: https://github.com/trentm/node-bunyan#stream-type-rotating-file
  - {type: rotating-file, format: json, path: /path/to/log.jsonl, level: http, options: {period: 1d}}
```

Use `SIGUSR2` to notify the application, the log-file was rotated and it needs to reopen it. Note: Rotating log stream is not supported in cluster mode. [See here](https://github.com/trentm/node-bunyan#stream-type-rotating-file)

### Cấu hình

| Thuộc tính | Loại  | Yêu cầu | Ví dụ                                          | Hỗ trợ | Miêu tả                                 |
| ---------- | ----- | ------- | ---------------------------------------------- | ------ | --------------------------------------- |
| type       | chuỗi | Không   | [stdout, file]                                 | tất cả | xác định đầu ra                         |
| path       | chuỗi | Không   | verdaccio.log                                  | tất cả | nếu là tệp, hãy xác định vị trí của tệp |
| format     | chuỗi | Không   | [pretty, pretty-timestamped]                   | tất cả | định dạng đầu ra                        |
| level      | chuỗi | Không   | [fatal, error, warn, http, info, debug, trace] | tất cả | mức độ chi tiết                         |