import { fetchEcosystemVersionDownloads } from './utils';

import { Command } from 'clipanion';

export class EcosystemVersionDownloadsCommand extends Command {
  public static paths = [['fetch-ecosystem-version-downloads']];

  public async execute() {
    try {
      await fetchEcosystemVersionDownloads();
    } catch (err: any) {
      // eslint-disable-next-line no-console
      console.error(err);
      process.exit(1);
    }
  }
}
