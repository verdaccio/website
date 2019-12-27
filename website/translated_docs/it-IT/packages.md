---
id: packages
title: "Accesso ai Pacchetti"
---

È una serie di restrizioni che permettono o limitano l'accesso all'archiviazione locale basandosi su criteri specifici.

Le restrizioni di sicurezza dipendono dal plugin che si sta utilizzando, `verdaccio` usa di default il [plugin htpasswd](https://github.com/verdaccio/verdaccio-htpasswd). Se si usa un plugin differente il funzionamento potrebbe essere diverso. Il plugin predefinito non gestisce direttamente `allow_access` e `allow_publish`, ma utilizza un'alternativa interna nel caso in cui il plugin non sia pronto per questo.

<div id="codefund">''</div>

Per ulteriori informazioni sui permessi, visita [la sezione autenticazione nella wiki](auth.md).

### Utilizzo

```yalm
packages:
  # pacchetti con scope
  '@scope/*':
    access: $all
    publish: $all
    proxy: server2

  'private-*':
    access: $all
    publish: $all
    proxy: uplink1

  '**':
    # consenti a tutti gli utenti (inclusi quelli non autenticati) di leggere e
    # pubblicare tutti i pacchetti
    access: $all
    publish: $all
    proxy: uplink2
```

se non ne viene specificato nemmeno uno, rimane quello predefinito

```yaml
packages:
  '**':
    access: $all
    publish: $authenticated
```

Ecco l'elenco dei gruppi interni gestiti da `verdaccio`:

```js
'$all', '$anonymous', '@all', '@anonymous', 'all', 'undefined', 'anonymous'
```

Tutti gli utenti ricevono tutti questi gruppi di permessi indipendentemente dal fatto che siano anonimi o no, più i gruppi previsti dal plugin, nel caso `htpasswd` respinga lo username come un gruppo. Per esempio, se si è loggati come `npmUser` l'elenco dei nomi sarà.

```js
// groups without '$' are going to be deprecated eventually
'$all', '$anonymous', '@all', '@anonymous', 'all', 'undefined', 'anonymous', 'npmUser'
```

Se si desidera proteggere un insieme specifico di pacchetti dentro al proprio gruppo, è necessario fare qualcosa simile a questo. Utilizziamo un `Regex` che copra tutti i pacchetti con prefisso `npmuser-`. Raccomandiamo di utilizzare un prefisso per i pacchetti, in modo che possa essere più semplice proteggerli.

```yaml
packages:
  'npmuser-*':
    access: npmuser
    publish: npmuser
```

Riavviare `verdaccio` e provare ad installare `npmuser-core` nella console.

```bash
$ npm install npmuser-core
npm install npmuser-core
npm ERR! code E403
npm ERR! 403 Forbidden: npmuser-core@latest

npm ERR! A complete log of this run can be found in:
npm ERR!     /Users/user/.npm/_logs/2017-07-02T12_20_14_834Z-debug.log
```

È possibile modificare la condotta esistente utilizzando un plugin di autenticazione differente. `verdaccio` verifica semplicemente che l'utente che ha provato ad accedere o pubblicare un pacchetto specifico appartenga al gruppo corretto.

#### Definire gruppi multipli

Definire gruppi di accesso multipli è abbastanza facile, è sufficiente distinguerli semplicemente con uno spazio bianco tra di essi.

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

#### Bloccare l'accesso a gruppi di pacchetti

Se si desidera bloccare l'accesso/pubblicazione ad uno specifico gruppo di pacchetti. È sufficiente non definire `access` e `publish`.

```yaml
packages:
  'old-*':
  '**':
    access: $all
    publish: $authenticated
```

#### Bloccare l'inoltro di un gruppo di pacchetti specifici

Si potrebbe voler impedire che uno o vari pacchetti vengano raggiunti dai registri remoti, ma allo stesso tempo, permettere ad altri l'accesso a differenti *uplink*.

Vediamo l'esempio seguente:

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

Descriviamo quello che si desidera con l'esempio precedente:

* Desidero ospitare la mia dipendenza `jquery` ma ho necessità di evitare il suo inoltro.
* Desidero tutte le dipendenze che coincidano con `my-company-*` ma ho necessità di evitare di inoltrarle.
* Desidero tutte le dipendenze che si trovino nell'ambito `my-local-scope` ma ho necessità di evitare di inoltrarle.
* Desidero l'inoltro per tutte le dipendenze rimanenti.

**Non dimenticare l'importanza dell'ordine dei pacchetti e di utilizzare sempre il doppio asterisco**. Poiché se non lo si include, `verdaccio` lo includerà per voi e questo inciderà sulla modalità con cui le dipendenze sono risolte.

#### Rimozione di Pacchetti Pubblicati

La proprietà `publish` gestisce le autorizzazioni per `npm publish` e `npm unpublish`. Tuttavia, se si vuole essere più specifici, è possibile utilizzare la proprietà `unpublish` nella sezione di accesso ai pacchetti, per esempio:

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

Nell'esempio precedente, il comportamento verrebbe descritto così:

* tutti gli utenti possono pubblicare il pacchetto `jquery`, tuttavia solo l'utente `root` potrebbe annullare la pubblicazione di ogni versione.
* solo gli utenti autenticati possono pubblicare i pacchetti `my-company-*`, tuttavia **nessuno sarebbe autorizzato ad annullare la loro pubblicazione**.
* Se `unpublish` è commentato, l'accesso verrà garantito o negato dalla definizione di `publish`.

### Configurazione

Si possono definire `pacchetti` multipli ed ognuno di essi deve avere un `Regex` unico. La sintassi è basata su [ espressioni minimatch glob](https://github.com/isaacs/minimatch).

| Proprietà     | Tipo    | Richiesto | Esempio        | Supporto       | Descrizione                                                                                      |
| ------------- | ------- | --------- | -------------- | -------------- | ------------------------------------------------------------------------------------------------ |
| accesso       | stringa | No        | $all           | tutti          | definisce i gruppi autorizzati ad accedere al pacchetto                                          |
| pubblicazione | stringa | No        | $authenticated | tutti          | definisce i gruppi autorizzati a pubblicare                                                      |
| proxy         | stringa | No        | npmjs          | tutti          | limita le ricerche di un uplink specifico                                                        |
| archiviazione | stringa | No        | stringa        | `/some-folder` | crea una sottocartella all'interno della cartella di archiviazione per ogni accesso ai pacchetti |

> Vogliamo rimarcare che non raccomandiamo più l'utilizzo di **allow_access**/**allow_publish** e **proxy_access** che sono superati e saranno presto rimossi, si prega di utilizzare invece la versione breve di ognuna di queste (**access**/**publish**/**proxy**).

If you want more information about how to use the **storage** property, please refer to this [comment](https://github.com/verdaccio/verdaccio/issues/1383#issuecomment-509933674).