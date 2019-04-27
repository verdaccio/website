---
id: amazon
title: "Amazon Web Services"
---

Questo documento descrive i vari approcci per sviluppare Verdaccio nell'AWS cloud.

## EC2

[CloudFormation template per sviluppare questo stack.](https://github.com/verdaccio/verdaccio/blob/master/contrib/aws/cloudformation-ec2-efs.yaml)

Architettura:

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
    

Note sull'architettura: * Sviluppare questo stack nella regione più vicina agli utenti per la massima prestazione. * We use an auto scaling group primarily for self-healing. I requisiti di sistema di Verdaccio sono piuttosto bassi, quindi è improbabile che avrai bisogno di più istanze di gestire il carico di traffico. * Poiché Amazon Linux 2 non include Node, eseguiamo Verdaccio come un'immagine Docker anziché in modo nativo nell'istanza. Questo è più veloce e più sicuro del fare affidamento su fonti di pacchetti di terze parti per Node. * Elastic File System is cheap and stateful, and works across AZs. Un'alternativa sarebbe il [plugin di archiviazione di terze parti S3](https://github.com/remitly/verdaccio-s3-storage). * Per effettuare il backup, utilizzare AWS Backup

Estimated monthly cost for a small installation (in us-east-1): * ALB (1 LCU average): $22.265/mo * EC2 (t3.nano): $3.796/mo * EBS (8gb): $0.80/mo * EFS (5gb): $1.5/mo * Data transfer: (10gb): $0.9/mo * **TOTAL:** Under $30/mo

## ECS

You can deploy Verdaccio as a task with an [ECS Volume](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/using_data_volumes.html) for persistent storage.

Note: Fargate doesn't support persistent volumes, so you have to use the S3 storage plugin.

## EKS

See the documentation pages on [Kubernetes](kubernetes) and [Docker](docker).