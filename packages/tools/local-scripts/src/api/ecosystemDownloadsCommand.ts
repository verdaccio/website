import { Command } from 'clipanion';

import { fetchEcosystemDownloads } from './utils';

export class EcosystemDownloadsCommand extends Command {
  public static paths = [['fetch-ecosystem-downloads']];

  public async execute() {
    try {
      await fetchEcosystemDownloads();
    } catch (err: any) {
      // eslint-disable-next-line no-console
      console.error(err);
      process.exit(1);
    }
  }
}
