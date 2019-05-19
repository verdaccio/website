---
id: version-4.0.0-alpha.6-amazon
title: Awọn Iṣẹ Ayelujara ti Amazon
original_id: amazon
---

Iwe yii n ṣe apejuwe awọn orisirisi ọna fun sisẹ amulo Verdaccio ni ipamọ ayelujara ti AWS.

## EC2

[Awoṣe CloudFormation fun ṣiṣe amulo eto akopọ yii.](https://github.com/verdaccio/verdaccio/blob/master/contrib/aws/cloudformation-ec2-efs.yaml)

Iyaworan:

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
* We use an auto scaling group primarily for self-healing. Awọn inilo eto ti Verdaccio kere jọjọ, nitorina o sọwọn pe o ma nilo awọn isẹlẹ pupọ lati mojuto ẹru abẹwo.
* Because Amazon Linux 2 doesn't include Node, we run Verdaccio as a Docker image rather than natively on the instance. Eleyi tubọ yara si ati tubọ ni aabo sii ju gbigbe ara le awọn orisun akojọ ti alagata lọ fun Oju ipade.
* Elastic File System is cheap and stateful, and works across AZs. Ọna miiran yoo jẹ ti [ohun-elo ipamọ S3 ti alagata](https://github.com/remitly/verdaccio-s3-storage). 
  * For backup, use AWS Backup

Estimated monthly cost for a small installation (in us-east-1):

* ALB (1 LCU average): $22.265/mo
* EC2 (t3.nano): $3.796/mo
* EBS (8gb): $0.80/mo
* EFS (5gb): $1.5/mo
* Data transfer: (10gb): $0.9/mo
* **TOTAL:** Under $30/mo

## ECS

O le ṣe amulo Verdaccio bi iṣẹ pẹlu [ECS Volume](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/using_data_volumes.html) fun ibi ipamọ alatẹnumọ.

Akiyesi: Fargate ko ṣe atilẹyin fun awọn iwọn iye alatẹnumọ, nitorina o ni lati lo ohun elo ipamọ S3.

## EKS

Wo awọn oju ewe iwe lori [Kubernetes](kubernetes) ati [Docker](docker).