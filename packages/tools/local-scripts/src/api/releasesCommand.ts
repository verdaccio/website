import { fetchReleases } from './utils';

import { Command } from 'clipanion';

export class ReleasesCommand extends Command {
  public static paths = [['releases-update']];

  static usage = Command.Usage({
    description: 'Fetch the latest Verdaccio releases (npm tags) and update the local JSON file.',
  });

  public async execute() {
    try {
      await fetchReleases();
    } catch (err: any) {
      // eslint-disable-next-line no-console
      console.error(err);
      process.exit(1);
    }
  }
}
