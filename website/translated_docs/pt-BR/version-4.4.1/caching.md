---
id: version-4.4.1-caching
title: Estratégias de Cashing
original_id: caching
---

Verdaccio armazena todos os pacotes por padrão na pasta `/storage`. Mas você pode decidir se quer seguir uma estratégia diferente. Usando plugins você pode usar a nuvem ou qualquer tipo de banco de dados.

<div id="codefund">''</div>

## Possibilidades de Cache

* Build a Node.js project on **Continous Integration** (Bamboo, GitLab, Jenkins, etc) servers is a task that might take several times at a day, thus, the server will download tons of tarballs from the registry every time takes place.  Como de costume, as ferramentas de IC limpam o cache após cada compilação e o processo é iniciado repetidamente. Isto é um desperdício de bandwidth e reduz o tráfego externo. **You can use Verdaccio for caching tarballs and metadata in our internal network and give a boost in your build time.**
* **Latency and Connectivity**, not all countries enjoy a high-speed connection. Neste caso, armazenar pacotes localmente em sua rede é muito útil. Mesmo se você estiver viajando, ou tiver uma conexão fraca, estiver em roaming ou enfrentando países com firewalls fortes que possam afetar a experiência do usuário (por exemplo: corrompendo tarballs).
* **Offline Mode**, all Node Package Managers nowadays uses their own internal cache, but it common that different projects might use different tools, which implies lock files and so on. Essas ferramentas não podem compartilhar o cache, a única solução é centralizada e depende de um registro de proxy. Verdaccio armazena em cache todos os metadados e tarballs são baixadas por demanda, sendo capaz de compartilhá-los em todo o seu projeto.
* Avoid that any remote registry suddenly returns *HTTP 404* error for tarballs were previously available a.k.a ([left-pad issue](https://www.theregister.co.uk/2016/03/23/npm_left_pad_chaos/)).


# Estratégias para construções mais rápidas

> Estamos à procura de mais estratégias, sinta-se à vontade para compartilhar sua experiência neste campo

## Evite armazenar tarballs

Se você tiver um espaço de armazenamento limitado, pode ser necessário evitar tarballs de cache, ativar o `cache` false em cada uplink armazenará apenas os arquivos de metadados.

```
uplinks:
  npmjs:
    url: https://registry.npmjs.org/
    cache: false
```

## Estendendo o Tempo de Expiração do Cache

 O Verdaccio, por padrão, aguarda 2 minutos para invalidar os metadados do cache antes de buscar novas informações do registro remoto.

```yaml
uplinks:
  npmjs:
    url: https://registry.npmjs.org/
    maxage: 30m
```

Ao aumentar o valor de `maxage` em cada `uplink`, o controle remoto será consultado com menos frequência. Esta pode ser uma estratégia válida se você não atualiza as dependências com tanta frequência.


## Usando a memória em vez do disco rígido

Às vezes, o armazenamento em cache de pacotes não é uma etapa crítica, em vez de rotear pacotes de diferentes registros e alcançar tempos de construção mais rápidos. Existem dois plugins que evitam a gravação em uma unidade física usando a memória.

```bash
  npm install -g verdaccio-auth-memory
  npm install -g verdaccio-memory
```

A configuração aparece como a seguir

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

Lembre-se, uma vez que o servidor é reiniciado, os dados são perdidos, recomendamos esta configuração nos casos em que você não precisa persistir com a função.
