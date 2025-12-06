import { Command } from 'clipanion';
import contributors from '@dianmora/contributors';
import fs from 'fs/promises';
import path from 'path';

export class ContributorsUpdateCommand extends Command {
  static paths = [['contributors-update']];

  static usage = Command.Usage({
    description: 'Fetch contributors from GitHub and update local JSON files.',
    details: `
      This command replaces the previous standalone contributors-update script.
    `,
  });

  async execute() {
    const token = process.env.TOKEN;

    const excludedAccounts = [
      'verdacciobot',
      'github-actions[bot]',
      'dependabot-preview[bot]',
      'dependabot[bot]',
      '64b2b6d12bfe4baae7dad3d01',
      'greenkeeper[bot]',
      'snyk-bot',
      'allcontributors[bot]',
      'renovate[bot]',
      'undefined',
      'renovate-bot',
    ];

    try {
      const result = await contributors({
        token: token as string,
        organization: 'verdaccio',
        excludedAccounts,
        allowFork: false,
        allowPrivateRepo: false,
      });

      const pathContributorsFile = path.join(
        __dirname,
        '../packages/tools/docusaurus-plugin-contributors/src/contributors.json'
      );
      await fs.writeFile(pathContributorsFile, JSON.stringify(result, null, 4));

      const contributorsListId = result.contributors.map((c: any) => ({
        username: c?.login,
        id: c.id,
      }));

      const pathContributorsUIFile = path.join(
        __dirname,
        '../packages/plugins/ui-theme/src/components/Contributors/generated_contributors_list.json'
      );
      await fs.writeFile(pathContributorsUIFile, JSON.stringify(contributorsListId, null, 4));

    } catch (err) {
      console.error('error on update', err);
      process.exit(1);
    }
  }
}