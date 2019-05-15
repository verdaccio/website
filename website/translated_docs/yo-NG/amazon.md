---
id: amazon
title: "Awọn Iṣẹ Ayelujara ti Amazon"
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
    

Awọn akọsilẹ Iyaworan: * Ṣe amulo eto akopọ yii si agbegbe ti o sunmọ julọ fun awọn olumulo rẹ fun iṣẹ to peye julọ. * A lo akojọpọ ti o ni ipele agbara alaifọwọyi nipataki fun imularada alara-ẹni. Awọn inilo eto ti Verdaccio kere jọjọ, nitorina o sọwọn pe o ma nilo awọn isẹlẹ pupọ lati mojuto ẹru abẹwo. * Nitoripe Amazon Linux 2 ko ni Oju ipade, a n lo Verdaccio gẹgẹbi aworan Docker dipo ilo abinibi lori isẹlẹ. Eleyi tubọ yara si ati tubọ ni aabo sii ju gbigbe ara le awọn orisun akojọ ti alagata lọ fun Oju ipade. * Eto Faili Oniriran jẹ olowo pọku ati oniranti ipo ibasepọ, atipe o n ṣiṣẹ jakejado AZs. Ọna miiran yoo jẹ ti [ohun-elo ipamọ S3 ti alagata](https://github.com/remitly/verdaccio-s3-storage). * Fun atilẹyin, lo Atilẹyin AWS

Estimated monthly cost for a small installation (in us-east-1): * ALB (1 LCU average): $22.265/mo * EC2 (t3.nano): $3.796/mo * EBS (8gb): $0.80/mo * EFS (5gb): $1.5/mo * Data transfer: (10gb): $0.9/mo * **TOTAL:** Under $30/mo

## ECS

You can deploy Verdaccio as a task with an [ECS Volume](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/using_data_volumes.html) for persistent storage.

Note: Fargate doesn't support persistent volumes, so you have to use the S3 storage plugin.

## EKS

See the documentation pages on [Kubernetes](kubernetes) and [Docker](docker).