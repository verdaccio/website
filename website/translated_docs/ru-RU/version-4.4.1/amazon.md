---
id: version-4.4.1-amazon
title: Amazon Web Services
original_id: amazon
---

Этот документ описывает несколько способов запустить Verdaccio в облаке AWS.

## EC2

[Шаблон CloudFormation для этого стека.](https://github.com/verdaccio/verdaccio/blob/master/contrib/aws/cloudformation-ec2-efs.yaml)

<div id="codefund">''</div>

Архитектура:

```
Clients
 |
 | (HTTPS)
 v
Application Load Balancer
 |
 | (HTTP)
 v
EC2 Auto Scaling Group (Amazon Linux 2)
Docker image (Verdaccio)
 |
 | (NFS)
 v
Elastic File System
```

Architecture notes:
* Deploy this stack into the region closest to your users for maximum performance.
* We use an auto scaling group primarily for self-healing. Системные требования для Verdaccio невысоки, так что вам, скорее всего, не понадобится использовать несколько инстансов для обслуживания трафика.
* Because Amazon Linux 2 doesn't include Node, we run Verdaccio as a Docker image rather than natively on the instance. Это быстрее и безопаснее, чем полагаться на сторонние источники для установки Node.
* Elastic File System is cheap and stateful, and works across AZs. Как альтернативу, можно использовать [third-party S3 storage plugin](https://github.com/remitly/verdaccio-s3-storage).
  * For backup, use AWS Backup

Estimated monthly cost for a small installation (in us-east-1):
* ALB (1 LCU average): $22.265/mo
* EC2 (t3.nano): $3.796/mo
* EBS (8gb): $0.80/mo
* EFS (5gb): $1.5/mo
* Data transfer: (10gb): $0.9/mo
* **TOTAL:** Under $30/mo

## ECS

Вы можете задеплоить Verdaccio в виде задачи с [ECS Volume](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/using_data_volumes.html) в качестве постоянного хранилища данных.

Заметка: Fargate не поддерживает постоянное хранение данных, так что вам придется использовать S3 storage plugin.

## EKS

См. документацию на [Kubernetes](kubernetes) and [Docker](docker).
