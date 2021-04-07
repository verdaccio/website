---
id: amazon
title: "Amazon Web Services"
---

Este documento describe varios enfoques para despregar Verdaccio na nube AWS.

## EC2

[CloudFormation template for deploying this stack.](https://github.com/verdaccio/verdaccio/blob/master/contrib/aws/cloudformation-ec2-efs.yaml)

Arquitectura:

    Clientes
     |
     | (HTTPS)
     v
    Balanceador de Carga de Aplicacións
     |
     | (HTTP)
     v
    EC2 Grupo de Autoescalado (Amazon Linux 2)
    Imaxe Docker (Verdaccio)
     |
     | (NFS)
     v
    Sistema de Ficheiros Elástico
    

* Desprega este stack na rexión máis próxima aos seus usuarios para obter o máximo rendemento. * Usamos un grupo de autoescalamento principalmente para autorecuperación. Os requirimentos do sistema de Verdaccio son bastante baixos, polo que é improbable que necesite varias instancias para xestionar a carga de tráfico. * Debido a que Amazon Linux 2 non inclúe NodeJS, executamos Verdaccio como imaxe Docker en lugar de nativa na instancia. Isto é máis rápido e seguro que depender de fontes de paquetes de terceiros para NodeJS. * O Elastic File System é barato e de estado e funciona en AZ. An alternative would be the [third-party S3 storage plugin](https://github.com/remitly/verdaccio-s3-storage). * For backup, use AWS Backup

Estimated monthly cost for a small installation (in us-east-1): * ALB (1 LCU average): $22.265/mo * EC2 (t3.nano): $3.796/mo * EBS (8gb): $0.80/mo * EFS (5gb): $1.5/mo * Data transfer: (10gb): $0.9/mo * **TOTAL:** Under $30/mo

## ECS

You can deploy Verdaccio as a task with an [ECS Volume](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/using_data_volumes.html) for persistent storage.

Note: Fargate doesn't support persistent volumes, so you have to use the S3 storage plugin.

## EKS

See the documentation pages on [Kubernetes](kubernetes) and [Docker](docker).