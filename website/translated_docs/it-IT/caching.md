---
id: caching
title: "Strategie di caching"
---

Verdaccio memorizza nella cache di default tutti i pacchetti nella cartella `/storage`. Tuttavia si può decidere di voler seguire una strategia differente. Utilizzando i plugin si potrebbe usare il cloud o qualsiasi tipo di database.

## Scenari di caching

* Costruire un progetto Node.js su server di **Continous Integration** (Bamboo, GitLab, Jenkins, ecc.) è un'attività che può essere eseguita diverse volte al giorno, perciò il server effettuerà il download dal registro di un gran numero di tarball ogni volta che questo avviene. Come al solito, i tool di CI puliscono la cache dopo ogni build e il processo ricomincia nuovamente ogni volta. Ciò è uno spreco di banda e riduce il traffico esterno. **È possibile utilizzare Verdaccio per memorizzare nella cache tarball e metadati nella rete interna e per dare un impulso in fase di build.**
* **Latency and Connectivity**, not all countries enjoy a high-speed connection. For such reason cache packages locally in your network is really handy. Either if you are traveling, or have a weak connection, roaming or countries with strong Firewalls that might affect the user experience (eg: corrupting tarballs).
* **Offline Mode**, all Node Package Managers nowadays uses their own internal cache, but it common that different projects might use different tools, which implies lock files and so on. Those tools are unable to share cache, the unique solution is centralized and relies on a proxy registry, Verdaccio cache all metadata and tarballs are downloaded by demand being able to share them across all your project.
* Avoid that any remote registry suddenly returns *HTTP 404* error for tarballs were previously available a.k.a ([left-pad issue](https://www.theregister.co.uk/2016/03/23/npm_left_pad_chaos/)).

# Strategies for faster builds

> We are looking for more strategies, feel free to share your experience in this field

## Avoid Caching tarballs

If you have a limited storage space, you might need to avoid cache tarballs, enabling `cache` false in each uplink will cache only metadata files.

    uplinks:
      npmjs:
        url: https://registry.npmjs.org/
        cache: false
    

## Extending Cache Expiration Time

Verdaccio by default waits 2 minutes to invalidate the cache metadata before fetching new information from the remote registry.

```yaml
uplinks:
  npmjs:
    url: https://registry.npmjs.org/
    maxage: 30m
```

Increasing the value of `maxage` in each `uplink` remotes will be asked less frequently. This might be a valid stragegy if you don't update dependencies so often.

## Using the memory instead the hardrive

Sometimes caching packages is not a critical step, rather than route packages from different registries and achiving faster build times. There are two plugins that avoid write in a phisical hardrive at all using the memory.

```bash
  npm install -g verdaccio-auth-memory
  npm install -g verdaccio-memory
```

The configuration looks like this

```yaml
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

Remember, once the server is restarted the data is being lost, we recomend this setup in cases where you do not need to persist at all.