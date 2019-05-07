---
author: Juan Picado
authorURL: https://twitter.com/jotadeveloper
authorFBID: 1122901551
title: The new docker image for Verdaccio 4
---

Docker has been for Verdaccio a key part of his success, at the time of this writing we have more than 4 millions and growing rapidly. The image provides an easy installation and integration with other tools, as Kubernetes, or composing them with any other Docker image. 

This article aims to describe what have changed and all the improvements and benefits you will enjoy migrating to latest version.

## What’s new?


### Keep it small

The new image is three times smaller than the previous, around 150 MB instead 500MB, that’s all. We have optimized using [Multi Stage build](https://medium.com/capital-one-tech/multi-stage-builds-and-dockerfile-b5866d9e2f84), this allow us to exclude dependencies and assets are not required for the runtime.  

### Environment Variables

To avoid mistakes we have renamed all environment variables being prefixed with VERDACCIO_. This will avoid future collisions and better understanding of the origin and usage of the variable. Here the full list of the new list of variables available in the new image.

[table]

### Support Arbitrary User IDs

The previous image runs the container with the verdaccio user and group by default, being the UID created randomly within the image. Some users were experiencing issues since some environments require the usage of custom user IDs for security reasons. To support this, we have introduced the environment variable `VERDACCIO_USER_ID`.

Furthermore, other optimizations can be possible, as for instance, define a different username using `VERDACCIO_USER_NAME` and such user won’t have permissions to log in by default.

### Security

We have followed security recommendations removing write permissions to those locations do not need to be modified, avoiding any kind of modification with the default user provided. 

For instance, the code is written to `/opt/verdaccio` the verdaccio run user cannot modify the compiled resources nor config, only the /verdaccio/storage volume. The image only assign executable permissions to the binary executable required to run verdaccio.

If you are not using volumes, the `VERDACCIO_USER_NAME` will have only permissions to write in the storage folder, the source code, the configuration and plugins will be read only.

To provide your own configuration file, the recommended way is using Docker volumes as follow.

[example volume]


We force a specific uid **10001** for the run user, assign the root group to the locations that need to be written by the run user; if running in a normal environment, the specific id is used and permissions are correct; if running on a randomized uid environment like openshift, the non-existent user gets assigned the root group and allowed write access to relevant locations.

The entrypoint will add the user to `/etc/passwd` in case the user is running as a random uid (openshift). That way, the typical tools like whoami and so can still work. 


## Conclusions

This new image has been tested in production for months and is quite stable, thus there is no fear to give it a try. We have improved in several areas, but still there are a lot to do and for that we need you. If you are DevOps do not hesitate to give us your feedback or contribute directly in discussions and future PRs to take the Verdaccio Docker image to the next level. We count on you.

## Contributions

We want to thanks to **Diego Louzán**, **Dimitri Koppriwa**, **Sergio Herrera**, [Ben Tucker] (https://github.com/btucker), [Michiel De Mey](https://github.com/MichielDeMey) and me [Juan Picado](https://github.com/juanpicado) for this amazing job improving the Docker image. 

Without forgetting the Helm Chart contributors, [James Sidhu](https://github.com/sidhuko), [Carlos Tadeu Panato Junior](https://github.com/cpanato), [Bort Verwilst](https://github.com/verwilst), [ercanucan](https://github.com/ercanucan) and [Taehyun Kim](https://github.com/kimxogus) that have keep the Kubernetes integration alive during the last year. 


* * *
