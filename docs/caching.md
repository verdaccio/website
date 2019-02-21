---
id: caching
title: "Caching strategies"
---

Verdaccio caches all packages by default into the `/storage` folder. But you can decided whether you want to follow
a different strategy. Using of plugins you might use the cloud or any sort of database.

 
# Continuos Integration Tools




# Strategies for faster builds 
 
## Avoid Caching tarballs

If you have a limited storage space, you might need to avoid cache tarballs, enabling `cache` false in each 
uplink will cache only metadata files. 

```
uplinks:
  npmjs:
    url: https://registry.npmjs.org/
    cache: false
```


## Using the memory

Sometimes caching packages is not a critical step, rather than route packages from different registries and achiving 
faster build times. There are two plugins that avoid write in a phisical hardrive at all using the memory.

```
  npm install -g verdaccio-auth-memory
  npm install -g verdaccio-memory
```

The configuration looks like this

```
auth:
  auth-memory:
    users:
      foo:
        name: test
        password: test
store:
  memory:
    limit: 1000
```

Remember, once the server is restarted the data is being lost, we recomend this setup in cases where you do not
need to persist at all. 
