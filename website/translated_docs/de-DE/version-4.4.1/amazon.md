---
id: version-4.4.1-amazon
title: Amazon Web Services
original_id: amazon
---

Dieses Dokument beschreibt die Vorgehensweise, um Verdaccio in der AWS Cloud bereitzustellen.

## EC2

[CloudFormation Template des Systems.](https://github.com/verdaccio/verdaccio/blob/master/contrib/aws/cloudformation-ec2-efs.yaml)

<div id="codefund">''</div>

Architektur:

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
* We use an auto scaling group primarily for self-healing. Aufgrund der sehr geringen Systemvoraussetzungen von Verdaccio ist es sehr unwahrscheinlich, dass um den Traffic abzuarbeiten, mehrere Instanzen benötigt werden.
* Because Amazon Linux 2 doesn't include Node, we run Verdaccio as a Docker image rather than natively on the instance. Dies ist sowohl schneller, als auch sicherer als die Nutzung von Third-Party Paketen zur Installation von Node.
* Elastic File System is cheap and stateful, and works across AZs. Eine Alternative wäre das Verdaccio [Third Party Storage Plugin](https://github.com/remitly/verdaccio-s3-storage).
  * For backup, use AWS Backup

Estimated monthly cost for a small installation (in us-east-1):
* ALB (1 LCU average): $22.265/mo
* EC2 (t3.nano): $3.796/mo
* EBS (8gb): $0.80/mo
* EFS (5gb): $1.5/mo
* Data transfer: (10gb): $0.9/mo
* **TOTAL:** Under $30/mo

## ECS

Verdaccio kann als Task mit einem [ ECS Volumen](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/using_data_volumes.html) als persistenten Speicher genutzt werden.

Anmerkung: Fargate unterstützt keine persistenten Volumes, daher muss in diesem Fall das [S3 Storage Plugin](https://github. com/remitly/verdaccio-s3-storage) verwendet werden.

## EKS

Siehe: [Kubernetes](kubernetes) and [Docker](docker) Dokumentation.
