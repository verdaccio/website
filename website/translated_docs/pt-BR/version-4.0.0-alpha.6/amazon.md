---
id: version-4.0.0-alpha.6-amazon
title: Amazon Web Services
original_id: amazon
---

Este documento descreve várias abordagens para implantar o Verdaccio na nuvem da AWS.

## EC2

[Template para implantar este stack na CloudFormation.](https://github.com/verdaccio/verdaccio/blob/master/contrib/aws/cloudformation-ec2-efs.yaml)

Arquitetura:

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
    

Architecture notes:

* Deploy this stack into the region closest to your users for maximum performance.
* We use an auto scaling group primarily for self-healing. Os requisitos de sistema do Verdaccio são muito baixos, desta forma é improvável que você precise de várias instâncias para lidar com a carga de tráfego.
* Because Amazon Linux 2 doesn't include Node, we run Verdaccio as a Docker image rather than natively on the instance. Isso é mais rápido e seguro do que depender de fontes de pacotes de terceiros para o Node.
* Elastic File System is cheap and stateful, and works across AZs. Uma alternativa seria o [third-party S3 storage plugin](https://github.com/remitly/verdaccio-s3-storage). 
  * For backup, use AWS Backup

Estimated monthly cost for a small installation (in us-east-1):

* ALB (1 LCU average): $22.265/mo
* EC2 (t3.nano): $3.796/mo
* EBS (8gb): $0.80/mo
* EFS (5gb): $1.5/mo
* Data transfer: (10gb): $0.9/mo
* **TOTAL:** Under $30/mo

## ECS

Você pode implantar o Verdaccio como uma função com um [ECS Volume](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/using_data_volumes.html) para armazenamento persistente.

Nota: Fargate não suporta volumes persistentes, desta forma você tem que usar o plugin de armazenamento S3.

## EKS

Veja as páginas de documentação em [Kubernetes](kubernetes) e [Docker](docker).