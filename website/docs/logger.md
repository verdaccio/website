---
id: logger
title: 'Logger'
description: 'Configure Verdaccio logging: output type, level, pretty or JSON format, redaction of sensitive fields, and log rotation.'
---

:::caution Deprecated: `logs`
The property is `log`. The older `logs` spelling is still accepted but emits a
deprecation warning ([`VERWAR002`](https://github.com/verdaccio/verdaccio/blob/master/docs/warnings.md)) on startup and may be removed at any time.
:::

As with any web application, Verdaccio has a customizable built-in logger. You can define multiple types of outputs.

```yaml
# console output
log: { type: stdout, format: pretty, level: http }
```

or file output.

```yaml
# file output
log: { type: file, path: verdaccio.log, level: info }
```

:::note No built-in log rotation
Verdaccio does **not** rotate log files itself — it dropped that when the logger became
[pino](https://getpino.io/), and neither **6.x** nor **7.x** brings it back. Use `logrotate`, or your platform's
equivalent, and send `SIGUSR2` afterwards so Verdaccio reopens the file it was writing to.
:::

### The default format depends on `NODE_ENV` {#default-format}

When `format` is not set, it is **`json` if `NODE_ENV=production`** and `pretty` otherwise.
This catches people out on first deploy: the same configuration that prints colourised
lines on a laptop prints one JSON object per line in production. Set `format` explicitly if
you want the same output in both places.

Sensitive data can be masked or removed using [log redaction](https://getpino.io/#/docs/redaction).

```yaml
log:
  type: stdout
  format: pretty
  level: http
  redact:
    paths:
      [
        'req.header.authorization',
        'req.header.cookie',
        'req.remoteAddress',
        'req.remotePort',
        'ip',
        'remoteIP',
        'user',
        'msg',
      ]
    censor: '<redacted>'
```

### Configuration {#configuration}

| Property | Type    | Required | Example                                        | Support | Description                                       |
| -------- | ------- | -------- | ---------------------------------------------- | ------- | ------------------------------------------------- |
| type     | string  | No       | [stdout, file]                                 | all     | define the output                                 |
| path     | string  | No       | verdaccio.log                                  | all     | if type is file, define the location of that file |
| format   | string  | No       | [pretty, pretty-timestamped]                   | all     | output format                                     |
| level    | string  | No       | [fatal, error, warn, info, http, debug, trace] | all     | verbose level                                     |
| colors   | boolean | No       | false                                          | all     | disable or enable colors                          |
| redact   | object  | No       | see above                                      |         | redact sensitive data                             |
| sync     | boolean | No       | true                                           |         | turn on synchronous logging                       |
