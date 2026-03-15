import { Command } from 'clipanion';

import { fetchAllDownloads } from './utils';

export class FetchAllDownloadsCommand extends Command {
  public static paths = [['fetch-all-downloads']];

  public async execute() {
    try {
      await fetchAllDownloads();
    } catch (err: any) {
      // eslint-disable-next-line no-console
      console.error(err);
      process.exit(1);
    }
  }
}
