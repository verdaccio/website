---
id: paquets
title: "Paquet d'accès"
---

Il s'agit d'une série de restrictions qui permettent ou restreignent l'accès au stockage local en fonction de critères spécifiques.

Les restrictions de sécurité dépendent du plugin que vous utilisez. `verdaccio` utilise par défaut le plugin [htpasswd](https://github.com/verdaccio/verdaccio-htpasswd). Si vous utilisez un autre plugin, l'opération peut être différente. Le plugin par défaut ne gère pas directement `allow_access` et `allow_publish`, mais utilise une alternative interne au cas où le plugin ne serait pas prêt pour cela.

Pour plus d'informations sur les autorisations, consultez la [section d'authentification du wiki](auth.md).

### Utilisation

```yalm
packages:
  # scoped packages
  '@scope/*':
    access: $all
    publish: $all
    proxy: server2

  'private-*':
    access: $all
    publish: $all
    proxy: uplink1

  '**':
    # allow all users (including non-authenticated users) to read and
    # publish all packages
    access: $all
    publish: $all
    proxy: uplink2
```

si rien n'est spécifié, le choix est par défaut

```yaml
packages:
  '**':
    access: $all
    publish: $authenticated
```

The list internal groups handled by `verdaccio` are:

```js
'$all', '$anonymous', '@all', '@anonymous', 'all', 'undefined', 'anonymous'
```

Tous les utilisateurs reçoivent tous ces groupes d'autorisations, qu'ils soient anonymes ou non, plus les groupes fournis par le plug-in. Dans le cas `htpasswd`, rejetez le nom d'utilisateur en tant que groupe. Par exemple, si vous êtes connectés en tant que `npmUser`, la liste des noms sera.

```js
// groups without '$' are going to be deprecated eventually
'$all', '$anonymous', '@all', '@anonymous', 'all', 'undefined', 'anonymous', 'npmUser'
```

Si vous souhaitez protéger un ensemble spécifique de paquets au sein de votre groupe, vous devez procéder de la même manière. Utilisons un `Regex` qui couvre tous les paquets avec le préfixe `npmuser -`. We recommend using a prefix for your packages, in that way it will be easier to protect them.

```yaml
packages:
  'npmuser-*':
    access: npmuser
    publish: npmuser
```

Redémarrez `verdaccio` et essayez d'installer `npmuser-core` dans votre console.

```bash
$ npm install npmuser-core
npm install npmuser-core
npm ERR! code E403
npm ERR! 403 Forbidden: npmuser-core@latest

npm ERR! A complete log of this run can be found in:
npm ERR!     /Users/user/.npm/_logs/2017-07-02T12_20_14_834Z-debug.log
```

Vous pouvez changer le comportement existant en utilisant un autre plugin d'authentification. `verdaccio` vérifie simplement si l'utilisateur qui a tenté d'accéder ou de publier un paquet spécifique appartient au groupe approprié.

#### Définir plusieurs groupes

Il est facile de définir plusieurs groupes d’accès, définissez-les juste avec un espace blanc entre eux.

```yaml
  'company-*':
    access: admin internal
    publish: admin
    proxy: server1
  'supersecret-*':
    access: secret super-secret-area ultra-secret-area
    publish: secret ultra-secret-area
    proxy: server1
```

#### Bloquer l’accès à l’ensemble des paquets

If you want to block the access/publish to a specific group of packages. Just do not define `access` and `publish`.

```yaml
packages:
  'old-*':
  '**':
    access: $all
    publish: $authenticated
```

#### Bloquer la transmission d'un groupe de paquets spécifiques

Vous voudrez peut-être empêcher les registres distants d’atteindre un ou plusieurs paquets tout en autorisant les autres à accéder à différentes *uplinks*.

Voyons l’exemple suivant:

```yaml
packages:
  'jquery':
    access: $all
    publish: $all
  'my-company-*':
    access: $all
    publish: $authenticated
  '@my-local-scope/*':
    access: $all
    publish: $authenticated
  '**':
    access: $all
    publish: $authenticated
    proxy: npmjs
```

Décrivons ce que nous voulons avec l'exemple ci-dessus:

* Je souhaite héberger ma propre dépendance `jquery` mais je dois éviter de la transférer.
* Je veux toutes les dépendances qui coïncident avec <`my-company - *` mais je dois éviter de les transférer.
* Je veux toutes les dépendances qui se trouvent dans la portée `my-local-scope`, mais je dois éviter de les transférer.
* Je veux transférer toutes les dépendances restantes.

**N'oubliez pas l'importance de la commande de colis et utilisez toujours le double astérisque**. Parce que si vous ne l'incluez pas, `verdaccio` l'inclura à votre place et cela affectera la manière dont vos dépendances seront résolues.

#### Unpublishing Packages

The property `publish` handle permissions for `npm publish` and `npm unpublish`. But, if you want to be more specific, you can use the property `unpublish` in your package access section, for instance:

```yalm
packages:
  'jquery':
    access: $all
    publish: $all
    unpublish: root
  'my-company-*':
    access: $all
    publish: $authenticated
    unpublish: 
  '@my-local-scope/*':
    access: $all
    publish: $authenticated
    # unpublish: property commented out
  '**':
    access: $all
    publish: $authenticated
    proxy: npmjs
```

In the previous example, the behaviour would be described:

* all users can publish the `jquery` package, but only the user `root` would be able to unpublish any version.
* only authenticated users can publish `my-company-*` packages, but **nobody would be allowed to unpublish them**.
* If `unpublish` is commented out, the access will be granted or denied by the `publish` definition.

### Configuration

Vous pouvez définir mutiple `packages` et chacun d’eux doit avoir un unique `Regex`. La syntaxe est basée sur [minimatch glob expressions](https://github.com/isaacs/minimatch).

| Propriété | Type                 | Obligatoire | Exemple        | Soutien        | Description                                                               |
| --------- | -------------------- | ----------- | -------------- | -------------- | ------------------------------------------------------------------------- |
| accès     | chaîne de caractères | Non         | $all           | tous           | définir des groupes autorisés à accéder au package                        |
| publier   | chaîne               | Non         | $authenticated | tous           | définir les groupes autorisés à publier                                   |
| proxy     | chaîne de caractères | Non         | npmjs          | tous           | limite la recherche d'un uplink spécifique                                |
| stockage  | chaîne               | Non         | chaîne         | `/some-folder` | it creates a subfolder whithin the storage folder for each package access |

> Nous vous signalons qu'il est déconseillé d'utiliser les **allow_access **/**allow_publish** et les **proxy_access** qui sont obsolètes et qui seront bientôt supprimés. version courte de chacun de ces éléments (**acces**/ **publish**/**proxy**).