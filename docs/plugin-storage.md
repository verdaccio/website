---
id: plugin-storage
title: "Storage Plugin"
---

## What's an Storage Plugin?

<div id="codefund">''</div>

Verdaccio by default uses a file system storage plugin [local-storage](https://github.com/verdaccio/local-storage). The default storge can be easily replaced, either using a community plugin or creating one by your own.

### API

Storage plugins are composed of two objects, the `IPluginStorage<T>` and the `IPackageStorage`.

* The `IPluginStorage` object handle the local database for private packages.

```typescript
  interface IPluginStorage<T> extends IPlugin<T>, ITokenActions {
    logger: Logger;
    config: T & Config;
    add(name: string, callback: Callback): void;
    remove(name: string, callback: Callback): void;
    get(callback: Callback): void;
    getSecret(): Promise<string>;
    setSecret(secret: string): Promise<any>;
    getPackageStorage(packageInfo: string): IPackageStorage;
    search(onPackage: onSearchPackage, onEnd: onEndSearchPackage, validateName: onValidatePackage): void;
  }
```
* The `IPackageStorage` is an object is created by each request that handle the I/O actions for the metadata and tarballs.

```typescript
	  interface IPackageStorage {
			logger: Logger;
			writeTarball(pkgName: string): IUploadTarball;
			readTarball(pkgName: string): IReadTarball;
			readPackage(fileName: string, callback: ReadPackageCallback): void;
			createPackage(pkgName: string, value: Package, cb: CallbackAction): void;
			deletePackage(fileName: string, callback: CallbackAction): void;
			removePackage(callback: CallbackAction): void;
			updatePackage(
				pkgFileName: string,
				updateHandler: StorageUpdateCallback,
				onWrite: StorageWriteCallback,
				transformPackage: PackageTransformer,
				onEnd: CallbackAction
			): void;
			savePackage(fileName: string, json: Package, callback: CallbackAction): void;
  }
```

### List Community Storage Plugins

The following list of plugins are implementing the Storage API and might be used them as example.

* [verdaccio-memory](https://github.com/verdaccio/verdaccio-memory) Storage plugin to host packages in Memory
* [verdaccio-s3-storage](https://github.com/remitly/verdaccio-s3-storage) Storage plugin to host packages **Amazon S3**
* [verdaccio-aws-s3-storage](https://github.com/verdaccio/monorepo/tree/master/plugins/aws-s3-storage) Storage plugin to host packages **Amazon S3** (maintained by Verdaccio core team)
* [verdaccio-google-cloud](https://github.com/verdaccio/verdaccio-google-cloud) Storage plugin to host packages **Google Cloud Storage**
* [verdaccio-minio](https://github.com/barolab/verdaccio-minio) A verdaccio plugin for storing data in Minio
