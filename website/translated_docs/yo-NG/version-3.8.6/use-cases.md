---
id: version-3.8.6-use-cases
title: Awọn apẹẹrẹ Ilo
original_id: awọn apẹẹrẹ-ilo
---

## Lilo awọn akopọ ikọkọ

O se afikun awọn olumulo ati ki o ṣakoso irufẹ awọn olumulo ti o le wọle si irufẹ awọn akopọ.

Igbaniyanju wa wipe ki o seto iṣaaju kan fun awọn akojọ ikọkọ rẹ, fun apẹẹrẹ "local", nitoriki gbogbo awọn ohun ikọkọ rẹ le dabi iru eyi: `local-foo`. This way you can clearly separate public packages from private ones.

## Using public packages from npmjs.org

If some package doesn't exist in the storage, server will try to fetch it from npmjs.org. If npmjs.org is down, it serves packages from cache pretending that no other packages exist. Verdaccio will download only what's needed (= requested by clients), and this information will be cached, so if client will ask the same thing second time, it can be served without asking npmjs.org for it.

Example: if you successfully request express@3.0.1 from this server once, you'll able to do that again (with all it's dependencies) anytime even if npmjs.org is down. But say express@3.0.0 will not be downloaded until it's actually needed by somebody. And if npmjs.org is offline, this server would say that only express@3.0.1 (= only what's in the cache) is published, but nothing else.

## Override public packages

If you want to use a modified version of some public package `foo`, you can just publish it to your local server, so when your type `npm install foo`, it'll consider installing your version.

There's two options here:

1. You want to create a separate fork and stop synchronizing with public version.
    
    If you want to do that, you should modify your configuration file so verdaccio won't make requests regarding this package to npmjs anymore. Add a separate entry for this package to *config.yaml* and remove `npmjs` from `proxy` list and restart the server.
    
    When you publish your package locally, you should probably start with version string higher than existing one, so it won't conflict with existing package in the cache.

2. You want to temporarily use your version, but return to public one as soon as it's updated.
    
    In order to avoid version conflicts, you should use a custom pre-release suffix of the next patch version. For example, if a public package has version 0.1.2, you can upload 0.1.3-my-temp-fix. This way your package will be used until its original maintainer updates his public package to 0.1.3.