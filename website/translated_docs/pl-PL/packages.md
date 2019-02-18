---
id: pakiety
title: "Dostęp do Pakietu"
---
Jest to seria ograniczeń, która pozwala lub zabrania dostępu do pamięci lokalnej bazując na konkretnych kryteriach.

Ograniczenia bezpieczeństwa pozostają na ramkach używanej wtyczki, domyślnie `verdaccio` używa [wtyczki htpasswd](https://github.com/verdaccio/verdaccio-htpasswd). Jeśli używasz innej wtyczki, zachowanie może być inne. Domyślna wtyczka nie obsługuje samodzielnie `allow_access` i `allow_publish`, korzysta z wewnętrznego mechanizmu zastępczego w przypadku, gdy wtyczka nie jest gotowa.

Aby uzyskać więcej informacji o uprawnieniach, odwiedź [sekcję uwierzytelniania na wiki](auth.md).

### Użycie

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

jeśli żadna nie jest określona, pozostaje domyślna

```yaml
packages:
  '**':
    access: $all
    publish: $authenticated
```

Lista poprawnych grup zgodnie z domyślnymi wtyczkami to

```js
'$all', '$anonymous', '@all', '@anonymous', 'all', 'undefined', 'anonymous'
```

Wszyscy użytkownicy otrzymują wszystkie te zbiory uprawnień niezależnie od tego, czy są anonimowi, czy nie plus grupy zapewniane przez wtyczkę, w przypadku `htpasswd` zwracają nazwę użytkownika jako grupę. Na przykład, jeśli jesteś zalogowany jako `npmUser`, będzie to lista grup.

```js
// grupy bez '$' ostatecznie zostaną uznane za przestarzałe
'$all', '$anonymous', '@all', '@anonymous', 'all', 'undefined', 'anonymous', 'npmUser'
```

Jeśli chcesz chronić określone zestawy pakietów w swojej grupie, musisz zrobić coś takiego. Użyjmy `Regex`, który obejmuje wszystkie pakiety z prefiksem `npmuser-`. We recommend using a prefix for your packages, in that way it will be easier to protect them.

```yaml
packages:
  'npmuser-*':
    access: npmuser
    publish: npmuser
```

Zrestartuj `verdaccio` i w swojej konsoli spróbuj zainstalować `npmuser-core`.

```bash
$ npm install npmuser-core
npm install npmuser-core
npm ERR! code E403
npm ERR! 403 Forbidden: npmuser-core@latest

npm ERR! Kompletny dziennik tego przebiegu można znaleźć w: npm ERR!     /Users/user/.npm/_logs/2017-07-02T12_20_14_834Z-debug.log
```

Możesz zmienić istniejące zachowanie, korzystając z innego uwierzytelniania wtyczki. `verdaccio` po prostu sprawdza, czy użytkownik, który próbował uzyskać dostęp lub opublikował konkretny pakiet, należy do właściwej grupy.

#### Ustaw wiele grup

Definiowanie wielu grup dostępu jest dość łatwe, wystarczy je zdefiniować z białymi znakami między nimi.

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

#### Blokowanie dostępu do zestawu pakietów

Jeśli chcesz zablokować dostęp/publikację do określonej grupy pakietów. Po prostu nie definiuj `access` i `publish`.

```yaml
packages:
  'old-*':
  '**':
    access: $all
    publish: $authenticated
```

#### Blokowanie proxy dla zestawu określonych pakietów

Możesz zablokować jeden lub kilka pakietów z pobierania ze zdalnych repozytoriów, ale jednocześnie umożliwić innym dostęp do różnych *uplinks*.

Zobaczmy następujący przykład:

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

Opiszmy, czego chcemy w powyższym przykładzie:

* Chcę hostować własną `jquery` zależność, ale muszę unikać proxy.
* I want all dependencies that match with `my-company-*` but I need to avoid proxying them.
* I want all dependencies that are in the `my-local-scope` scope but I need to avoid proxying them.
* I want proxying for all the rest of the dependencies.

Be **aware that the order of your packages definitions is important and always use double wilcard**. Because if you do not include it `verdaccio` will include it for you and the way that your dependencies are resolved will be affected.

### Konfiguracja

You can define mutiple `packages` and each of them must have an unique `Regex`. The syntax is based on [minimatch glob expressions](https://github.com/isaacs/minimatch).

| Właściwość | Typ         | Wymagane | Przykład       | Wsparcie  | Opis                                                                      |
| ---------- | ----------- | -------- | -------------- | --------- | ------------------------------------------------------------------------- |
| access     | ciąg znaków | Nie      | $all           | wszystkie | define groups allowed to access the package                               |
| publish    | ciąg znaków | Nie      | $authenticated | wszystkie | define groups allowed to publish                                          |
| proxy      | ciąg znaków | Nie      | npmjs          | wszystko  | limit look ups for specific uplink                                        |
| magazyn    | boolean     | Nie      | ciąg znaków    | `>v4`  | it creates a subfolder whithin the storage folder for each package access |

> Podkreślamy, że zalecamy niekorzystanie dłużej z **allow_access**/**allow_publish**i** proxy_access**, są one nieaktualne i wkrótce zostaną usunięte. Użyj skróconej wersji każdego z tych (**access**/**publish**/**proxy**).