---
author: Dimitri Kopriwa
authorURL: https://twitter.com/DimitriKopriwa
title: Configure verdaccio 4.3.0 with LDAP and Docker
---

Hi! I am Dimitri and I am a user and contributor of Verdaccio.

In this blog post, I will show you how I migrated Verdaccio from V3 to V4.

[information about our releases can be read here](https://github.com/verdaccio/contributing/blob/master/RELEASES.md)

<!--truncate-->

<div id="codefund">''</div>

Congratulation everyone who tested, contributed to Verdaccio :tada: v4 ! :balloon:

I am creating this blog post to help others, its aims to provide information to people whiling to use Verdaccio `v4.3.0` and `verdaccio-ldap` with :whale: Docker.

## Prerequisite

- Read verdaccio [documentation](https://verdaccio.org/docs/en/installation).
- Read verdaccio-ldap [documentation](https://www.npmjs.com/package/verdaccio-ldap).
- Make a copy of your v3 storage directory while configuring v4.
- A running LDAP instance (such as OpenLDAP).
- [Docker installed](https://docs.docker.com/v17.09/engine/installation/).

## Goal

- Update Verdaccio from 3.x to 4.x.
- Configure LDAP.
- Configure JWT. ([Read more](https://medium.com/verdaccio/diving-into-jwt-support-for-verdaccio-4-88df2cf23ddc))

## Dockerfile


This is my tree structure:

```
├── conf
│   └── config.yaml
└── Dockerfile
```

The first thing I have to do was to update my `Dockerfile`, this is what I have done:

```Dockerfile
FROM verdaccio/verdaccio:4.3
USER root
RUN npm i && npm i verdaccio-ldap
COPY conf /verdaccio/conf
RUN chown -R $VERDACCIO_USER_UID /verdaccio
USER verdaccio
```

- Verdaccio v3 docker image is now using by default `verdaccio` user for security reason, this is why if you use `npm`, you'll have to switch to `root` user.
* You do not have to do anything else to migrate your `Dockerfile`
* Later, you must solve the `storage` directory permissions.

### Configuration

This is my `config.yaml`:

```yaml
storage: /verdaccio/storage
max_body_size: 100mb

web:
  enable: true
  title: My private NPM registry
  gravatar: true
  sort_packages: asc

security:
  legacy: false
  api:
    jwt:
      sign:
        expiresIn: 30d
        notBefore: 0
  web:
    sign:
      expiresIn: 7d
      notBefore: 1

auth:
  ldap:
    type: ldap
    client_options:
      url: "ldap://ldap.verdaccio.private.rocks"
      # Only required if you need auth to bind
      adminDn: "cn=readonly,dc=verdaccio.private,dc=rocks"
      adminPassword: "********"
      # Search base for users
      searchBase: "dc=verdaccio.private,dc=rocks"
      searchFilter: "(&(uid={{username}})(memberOf=cn=npm_users,ou=npm,ou=groups,ou=developers,dc=verdaccio.private,dc=rocks))"
      # # If you are using groups, this is also needed
      groupDnProperty: 'cn'
      groupSearchBase: 'ou=npm,ou=groups,ou=developers,dc=verdaccio.private,dc=rocks'
      # If you have memberOf support on your ldap
      searchAttributes: ['*', 'memberOf']
      # Else, if you don't (use one or the other):
      # groupSearchFilter: '(memberUid={{dn}})'
      #
      # Optional, default false.
      # If true, then up to 100 credentials at a time will be cached for 5 minutes.
      cache: false
      # Optional
      reconnect: true

# a list of other known repositories we can talk to
uplinks:
  npmjs:
    url: https://registry.npmjs.org/

packages:
  '@scope-*/*':
    # scoped packages
    access: npm_access
    publish: npm_publisher
    unpublish: npm_publisher

  '@scope/*':
    # scoped packages
    access: npm_access
    publish: npm_publisher
    unpublish: npm_publisher

  '@*/*':
    # scoped packages
    access: $all
    publish: $authenticated
    proxy: npmjs
  '**':
    # allow all users (including non-authenticated users) to read and
    # publish all packages
    #
    # you can specify usernames/groupnames (depending on your auth plugin)
    # and three keywords: "$all", "$anonymous", "$authenticated"
    access: $all

    # allow all known users to publish packages
    # (anyone can register by default, remember?)
    publish: $authenticated

    # if package is not available locally, proxy requests to 'npmjs' registry
    proxy: npmjs

# log settings
logs:
  - {type: stdout, format: pretty, level: trace}
#  - {type: file, path: verdaccio.log, level: info}

listen:
  - 0.0.0.0:4873
```

Most of those configurations are described in Verdaccio [Configuration File documentation](https://verdaccio.org/docs/en/configuration).

I will describe the most important here.


**`searchFilter`**

I use the `memberOf` overlay, and this LDAP query will allow to connect only users present in a defined LDAP group.

If you are not using the `memberOf` overlay, you can allow all users to login as follow:

```yaml
searchFilter: "(&(uid={{username}}))"
```

**`groupSearchBase`**

I use an organization unit to store all my group for verdaccio-ldap security.

```yaml
groupSearchBase: 'ou=npm,ou=groups,ou=developers,dc=verdaccio.private,dc=rocks'
```

**`packages`**

You should use scope for all your privates packages, in this scenario, we use LDAP groups for `access`, `publish` and `unpublish`.

Not that we  do not use `proxy: npmjs` because they only exist on our private registry.

I recommend you to create scope for all of your private packages, and reserve the group on npmjs registry so no one will be able to take the same scope in the futur.

```yaml
  '@scope-*/*':
    access: npm_access
    publish: npm_publisher
    unpublish: npm_publisher

  '@scope/*':
    # scoped packages
    access: npm_access
    publish: npm_publisher
    unpublish: npm_publisher
```

They are some public package on npmjs registry which are scoped, this will proxy all the request to npmjs registry.

I recommend not to change this, otherwise you might get issue to download them.

```yaml
  '@*/*':
    # scoped packages
    access: $all
    publish: $authenticated
    proxy: npmjs
```

For all other packages, to prevent anyone to use our registry, we just allow `$authenticated` to publish.
We also use `proxy: npmjs` so we also serve all the public package on npmjs registry.

We allow `$all` to download from our registry, because it is public, but if you want to preserve your bandwidth or just forbid unknown user to authenticate, just use `$authenticated` as well.

```yaml
  '**':
    access: $all
    publish: $authenticated
    proxy: npmjs
```

**`security`**

You should (and I recommend it) use `JWT` security, otherwise your LDAP server will received an authentication request for each request.

If you don't mind, you can keep `legacy: true`.

If you do use the JWT authentication, then **all your users** will have to re-authenticate with `npm adduser`.

```yaml
security:
  legacy: false
  api:
    jwt:
      sign:
        expiresIn: 30d
        notBefore: 0
  web:
    sign:
      expiresIn: 7d
      notBefore: 0
```

- `expiresIn`: You will have to reauthenticate after 30 days, and 7 days on the web.
- `notBefore`: Just set it to 0, it is the time to wait before the JWT is valid.

## Build the image

Use [`docker build`](https://docs.docker.com/engine/reference/commandline/build/) to build the new image.

- `-t` will give the name `verdaccio-3-ldap` to the new image
- `.` means that the Dockerfile is in the current working directory.


```bash
$ docker build -t verdaccio-3-ldap .

Sending build context to Docker daemon  14.34kB
Step 1/7 : FROM verdaccio/verdaccio:4.3
4.3: Pulling from verdaccio/verdaccio
e7c96db7181b: Already exists 
50958466d97a: Already exists 
56174ae7ed1d: Already exists 
284842a36c0d: Already exists 
38829697cf41: Pull complete 
67d4be407dc1: Pull complete 
75921a7a709e: Pull complete 
27621c093247: Pull complete 
b5dd63eea3d5: Pull complete 
3d5fd2ab9d4d: Pull complete 
Digest: sha256:2a79d82601596f1889f2fe99d397c8900bf473c6682624cc0c37288896617e99
Status: Downloaded newer image for verdaccio/verdaccio:4.3
 ---> 03eefd251eef
# etc...
Step 7/7 : USER verdaccio
 ---> Running in 2426b01499b8
Removing intermediate container 2426b01499b8
 ---> 5e36f29f5374
Successfully built 5e36f29f5374
Successfully tagged verdaccio-3-ldap:latest
```

Your image is ready, you can push it to your private docker registry, or to the docker hub if you can host private images.

Do not publish it if it's a public image because you are storing all your LDAP credentials in the image.

If you still want to use the public docker hub registry, then mount the configuration on startup with a volume, for example:

```bash
docker run -v $(pwd)/config.yaml:/verdaccio/conf/config.yaml verdaccio-3-ldap
```

And remove the `config.yaml` within the `Dockerfile`:

```diff
FROM verdaccio/verdaccio:4.3
USER root
RUN npm i && npm i verdaccio-ldap
- COPY conf /verdaccio/conf
RUN chown -R $VERDACCIO_USER_UID /verdaccio
USER verdaccio
```

## Run the service


You will have to mount the storage volume when using `Docker`,  to do that, just use `-v` with `docker run` command:


```bash
docker run -v /srv/verdaccio/storage:/verdaccio/storage verdaccio-3-ldap
```

Remember, you have made a backup of your storage directory, now let's fix the permissions to allow verdaccio to run.

Because within the docker container, the user is `verdaccio`, you won't be able to run `chown` and `chmod` commands, so do it from your host as `root`:

```bash
cd /srv/verdaccio/ # the location depend of your installation
chmod -R 777 storage
VERDACCIO_USER_UID=10001 # unless you have changed it
chown -R $VERDACCIO_USER_UID storage
```

## Test the service

First, add your users to the appropriate group we have configured on your LDAP server.

`$ip` is the address of the server, if you use `https` behind a reverse proxy or directly with verdacci, then fix the following command that use `http`.

This is all the test result I have done while configurating verdaccio, in case it help you win some time:

### plugin

- [x] it should work with `verdaccio-htaccess` when `verdaccio-ldap` is **not** installed. :heavy_check_mark:
- [x] it should work with `verdaccio-htaccess` when `auth.ldap` is disabled and `verdaccio-ldap` is installed. :heavy_check_mark:
- [x] it should work with one `verdaccio-ldap`. :heavy_check_mark:
- [x] it should work with `verdaccio-htaccess` and fallback to `verdaccio-ldap` through **web**. :heavy_check_mark:
- [x] it should work with `verdaccio-htaccess` and fallback to `verdaccio-ldap` through **npm**. :x: *Either use `verdaccio-htaccess` or `verdaccio-ldap`, it is useless to use both, even if the web work with the two, the `npm --add-user` command will fail.*

### `npm`

- [x] `npm --adduser` should work with different users. :heavy_check_mark:
- [x] `npm --adduser` should fail with wrong user/password. :heavy_check_mark:
- [x] it should auth with JWT and the `verdaccio-ldap` plugin. :heavy_check_mark:
- [x] it should auth with legacy and the `verdaccio-ldap` plugin. :heavy_check_mark:
- [x] `npm i` in CI that download from the registry **should spam** the LDAP with authentication requests with legaxy. :heavy_check_mark:
- [x] `npm i` in CI that download from the registry should not spam the LDAP with authentication requests with JWT. :heavy_check_mark:

### Web

The new design with material-UI is super nice btw.

- [x] it should authenticate with different users. :heavy_check_mark:
- [x] it should fail to authenticate with different users and wrong password. :heavy_check_mark:
- [x] it should show packages to users with `access` permissions. :heavy_check_mark:
- [x] it should hide packages to users without `access` permissions. :heavy_check_mark:

## Packages permissions

- [x] `access` should work with a user with perms. :heavy_check_mark:
- [x] `access` should fail with a user without perms.. :heavy_check_mark:
- [x] `access` should work with a user in ldap group with perms. :heavy_check_mark:
- [x] `access` should fail with a user not in ldap group with perms. :heavy_check_mark:
- [x] `publish` should work with a user with perms. :heavy_check_mark:
- [x] `publish` should work with a user in ldap group with perms. :heavy_check_mark:
- [x] `publish` should fail with a user not in ldap group without perms. :heavy_check_mark:
- [x] `unpublish` should work with a user with perms. :heavy_check_mark:
- [x] `unpublish` should fail with a user without perms. :heavy_check_mark:
- [x] `unpublish` should work with a ldap group with perms. :heavy_check_mark:
- [x] `unpublish` should fail with a user not in ldap group with perms. :heavy_check_mark:

### Web

- Test the web interface, generally `http://$ip:4873` if you are not using a reverse proxy.

After login, you won't be able to see private scopped package if you don't have the `access` group.

### npm

Because we use the JWT, you must re-authenticate, this is how we do:

```bash
npm adduser --registry http://$ip --always-auth
```

If you want to use it just for a specific scope:

```bash
npm set @scope:registry http://$ip
```

If you want to use it as your default proxy for npm:

```bash
npm set registry http://$ip
```


## Conclusion and thanks

Docker, LDAP are a great way to authenticate users from your organization. In this article, you have learned how to setup verdaccion with LDAP and Docker.

I have to thank the teams and community behind verdaccio projects, specially [Juan Picado](https://twitter.com/jotadeveloper), [Daniel Refde](https://twitter.com/DanielRufde) and [Sergio Hg](https://github.com/sergiohgz) for their help on the GitHub issues and the discord [chat](http://chat.verdaccio.org/). 

Also, but not less important, I want to thank all the people that makes Verdaccio possible, contributing, donating, documenting, and more.

I hope it is well explained and you people of verdaccio are able to reproduce a configuration that fit with your LDAP.

To me it took a while to figure out the different errors I had and the most annoying things was those manual step to fix the permissions and access.

If you have any question, please check at the FAQ below, or feel free to reply to this blog post.

> If you 😍 Verdaccio as I do, helps them to grow by donating to the project via [OpenCollective](https://opencollective.com/verdaccio).

Thanks for reading and long life to Verdaccio !


## FAQ

- Can we use two authentication plugin together such as `verdaccio-htaccess`?

No you can't, but pull request are welcome.

- Does my registry users need to re-authenticate?

If you use JWT for authentication, which I recommend, they will have to authenticate.

- I have `404` or `401` errors with good credentials.

This is generally due to wrong permissions in `storage` directory.

- When should I use `--always-auth` when running `--add-user`?

If you keep having `403` issues when retrieving packages from the registry, and all of the permissions have been fixed as described in this article, we have found that adding `--always-auth` will solve the issue.

In my case, I have found that `--always-auth` was required in my production environment.

