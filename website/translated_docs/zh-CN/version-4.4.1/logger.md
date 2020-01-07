---
id: version-4.4.1-logger
title: 记录器
original_id: 记录器
---

As any web application, verdaccio has a customisable built-in logger. You can define multiple types of outputs.

<div id="codefund">''</div>

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

### 配置

| 属性     | 类型  | 必填 | 示例                                             | 支持   | 描述                |
| ------ | --- | -- | ---------------------------------------------- | ---- | ----------------- |
| type   | 字符串 | 否  | [stdout, file]                                 | 任意路径 | 定义输出              |
| path   | 字符串 | 否  | verdaccio.log                                  | 任意路径 | 如果类型为文件，请定义该文件的位置 |
| format | 字符串 | 否  | [pretty, pretty-timestamped]                   | 任意路径 | 输出格式              |
| level  | 字符串 | 否  | [fatal, error, warn, http, info, debug, trace] | 任意路径 | 详细级别              |
