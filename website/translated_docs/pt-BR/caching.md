---
id: caching
title: "Estratégias de Cashing"
---

Verdaccio armazena todos os pacotes por padrão na pasta `/storage`. Mas você pode decidir se quer seguir uma estratégia diferente. Usando plugins você pode usar a nuvem ou qualquer tipo de banco de dados.

## Possibilidades de Cache

* A criação de um projeto Node.js em servidores de **Integração Contínua** (Bamboo, GitLab, Jenkins, etc.) é uma atividade que pode ser executada várias vezes ao dia, portanto, o servidor fará o download do registro de um grande número de tarballs sempre que isso ocorrer. Como de costume, as ferramentas de IC limpam o cache após cada compilação e o processo é iniciado repetidamente. Isto é um desperdício de bandwidth e reduz o tráfego externo. **Você pode usar o Verdaccio para fazer cache de tarballs e metadados em nossa rede interna e dar um impulso em seu tempo de compilação.**
* **Latência e Conectividade**, nem todos os países desfrutam de uma conexão de alta velocidade. Neste caso, armazenar pacotes localmente em sua rede é muito útil. Either if you are traveling, or have a weak connection, roaming or countries with strong Firewalls that might affect the user experience (eg: corrupting tarballs).
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

Increasing the value of `maxage` in each `uplink` remotes will be asked less frequently. This might be a valid strategy if you don't update dependencies so often.

## Using the memory instead the hardrive

Sometimes caching packages is not a critical step, rather than route packages from different registries and achieving faster build times. There are two plugins that avoid write in a physical hard drive at all using the memory.

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

Remember, once the server is restarted the data is being lost, we recommend this setup in cases where you do not need to persist at all.