---
id: version-4.0.0-alpha.5-caching
title: Strategie ukládání do mezipaměti
original_id: mezipaměť
---

Verdaccio standardně ukládá všechny balíčky do složky `/storage`. Můžete se však rozhodnout, zda chcete použít jinou strategii. Pomocí doplňků můžete použít cloud nebo libovolnou databázi.

## Scénáře ukládání do mezipaměti

* Vytvoření projektu Node.js na serverech **Continous Integration** (Bamboo, GitLab, Jenkins, atd.) je úkol, který se může provést několikrát za den, server si z registru stáhne tuny tarballs, které pokaždé prochází. Jako obvykle, nástroje CI vymažou mezipaměť po každém sestavení a proces začne znovu a znovu. To je ztráta šířky pásma a snižuje externí komunikaci. **Verdaccio můžete použít pro ukládání do mezipaměti a metadat v naší interní síti a zrychlit build time.**
* **Latence a připojení**, ne všechny země mají vysokorychlostní připojení. Z tohoto důvodu jsou balíčky lokálně ve vaší síti velmi užitečné. Buď pokud cestujete nebo máte slabé spojení, roaming nebo země se silnými bránami firewall, které by mohly ovlivnit uživatelský komfort (např. poškození tarballs).
* **Režim offline**, v současné době používají všichni správci balíčků své vlastní interní mezipaměti, ale běžné je, že různé projekty mohou používat různé nástroje, což znamená zamykání souborů a podobně. Tyto nástroje nejsou schopny sdílet mezipaměť, jedinečné řešení je centralizované a spoléhá se na registr proxy, mezipaměť Verdaccio všechny metadata a tarballs jsou staženy v závislosti na poptávce a následně sdílena ve všech projektech.
* Vyhněte se tomu, aby jakýkoliv vzdálený registr náhle vrátil chybu *HTTP 404* pro tarballs, které byly dříve k dispozici aka ([problém s levým polem](https://www.theregister.co.uk/2016/03/23/npm_left_pad_chaos/)).

# Strategie pro rychlejší build

> Hledáme další strategie, neváhejte se podělit o své zkušenosti v této oblasti

## Vyhněte se ukládání tarballs v mezipaměti

Pokud máte omezený úložný prostor, možná se budete muset vyhnout tarballs v mezipaměti, povolením `cache` false v každém uplinku se budou ukládat pouze soubory metadat.

    uplinks:
      npmjs:
        url: https://registry.npmjs.org/
        cache: false
    

## Prodloužení doby vypršení mezipaměti

Verdaccio ve výchozím nastavení čeká 2 minuty na zrušení platnosti metadat mezipaměti před načtením nových informací ze vzdáleného registru.

```yaml
uplinks:
  npmjs:
    url: https://registry.npmjs.org/
    maxage: 30m
```

Zvýšení hodnoty `maxage` v každém `uplink` způsobí snížení frekvence dotazování. To může být platná strategie, pokud nebudete aktualizovat závislosti tak často.

## Použití paměti místo pevného disku

Někdy není ukládání do mezipaměti kritickým krokem, spíše než směrování balíků z různých registrů a dosažení rychlejších časů sestavení. Existují dva pluginy, které se vyhnou zápisu na fyzický pevný disk pomocí paměti.

```bash
  npm install -g verdaccio-auth-memory
  npm install -g verdaccio-memory
```

Konfigurace vypadá takto

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

Pamatujte si, že jakmile je server restartován, data jsou ztracena, doporučujeme toto nastavení v případech, kdy není mezipaměť nutná.