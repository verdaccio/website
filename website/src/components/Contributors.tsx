import styles from './Contributors.module.scss';
import Dialog from './ui/Dialog';
import UiIcon from './ui/Icons';
import ui from './ui/Ui.module.scss';

import Translate from '@docusaurus/Translate';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import React from 'react';

// People who always stay in the top list, even if their last contribution was years ago.
const KEEP_ON_TOP = [
  'sergiohgz',
  'ayusharma',
  'priscilawebdev',
  'DanielRuf',
  'mbtools',
  'dianmorales',
];
// Anyone whose last contribution is older than this goes to the "past contributors" list.
const INACTIVE_AFTER_YEARS = 2;

const generateImage = (id) => `https://avatars3.githubusercontent.com/u/${id}?s=120&v=4`;

type ContributorsProps = {
  data: any;
};

function convertItemTo(item) {
  const node = {
    url: item.login,
    userId: item.id,
    id: `key-${item.login}`,
    contributions: item.contributions,
    firstContributionAt: item.firstContributionAt,
    lastContributionAt: item.lastContributionAt,
  };

  return { node };
}

const Contributors: React.FC<ContributorsProps> = ({ data }): React.ReactElement => {
  const [user, setUser] = React.useState(null);
  const { contributors, totals, generatedAt } = data;
  const totalContributions =
    totals?.contributions ?? contributors.reduce((sum, c) => sum + (c.contributions ?? 0), 0);
  const isRecent = (item) => {
    if (!item.lastContributionAt) return false;
    const limit = new Date();
    limit.setFullYear(limit.getFullYear() - INACTIVE_AFTER_YEARS);
    return new Date(item.lastContributionAt) >= limit;
  };

  // The top list is whoever contributed recently plus the people kept on top; everyone else
  // goes to "past contributors". Both lists keep the order of the data: total commits.
  const { current, past } = React.useMemo(() => {
    const onTop = (c) => KEEP_ON_TOP.includes(c.login) || isRecent(c);
    return {
      current: contributors.filter(onTop),
      past: contributors.filter((c) => !onTop(c)),
    };
  }, [contributors]);

  const period = (item) => {
    if (!item.firstContributionAt) return null;
    const first = new Date(item.firstContributionAt).getFullYear();
    if (isRecent(item)) {
      return { recent: true, first, last: null };
    }
    const last = item.lastContributionAt ? new Date(item.lastContributionAt).getFullYear() : null;
    return { recent: false, first, last };
  };

  const renderAvatar = (item, past = false) => {
    const userItem = convertItemTo(item);
    return (
      <button
        type="button"
        className={clsx(styles.avatar, past && styles.avatarPast)}
        title={userItem.node.url}
        key={userItem.node.url}
        onClick={() => setUser(userItem)}
      >
        <img src={generateImage(userItem.node.userId)} alt={userItem.node.url} loading="lazy" />
      </button>
    );
  };

  return (
    <Layout
      title="Contributors"
      description="Verdaccio Contributors, thanks to the community Verdaccio keeps running"
    >
      <main className={styles.page}>
        <header className={styles.head}>
          <h1>
            <Translate>Contributors </Translate>
            <span className={styles.count}>({contributors.length}) 🎉</span>
          </h1>
          <p className={styles.summary}>
            <b>{new Intl.NumberFormat().format(totalContributions)}</b>{' '}
            <Translate>contributions from</Translate> <b>{contributors.length}</b>{' '}
            <Translate>contributors</Translate>
            {generatedAt && (
              <span className={styles.updated}>
                {' · '}
                <Translate>updated</Translate> {new Date(generatedAt).toLocaleDateString()}
              </span>
            )}
          </p>
          <p>
            <Translate>
              Thanks to everyone involved in maintaining and improving Verdaccio, this page is a way
              to thank you for all the effort you have put on it.
            </Translate>{' '}
            <b>
              <Translate>Thanks</Translate>!
            </b>
          </p>
        </header>

        <div className={styles.grid}>{current.map((item) => renderAvatar(item))}</div>

        {past.length > 0 && (
          <section className={styles.past}>
            <h2>
              <Translate>Past contributors</Translate> ({past.length})
            </h2>
            <p>
              <Translate>
                They shaped Verdaccio and moved on. The project is here thanks to them.
              </Translate>
            </p>
            <div className={styles.grid}>{past.map((item) => renderAvatar(item, true))}</div>
          </section>
        )}

        <Dialog
          open={!!user}
          onClose={() => setUser(null)}
          titleId="contributor-title"
          title={
            user && (
              <div className={styles.who}>
                <a href={'https://github.com/' + user.node.url} target="_blank" rel="noreferrer">
                  <img src={generateImage(user.node.userId)} alt={user.node.url} />
                </a>
                <h2>{user.node.url}</h2>
              </div>
            )
          }
        >
          {user && (
            <div className={styles.total}>
              <span className={styles.totalNumber}>
                {new Intl.NumberFormat().format(user.node.contributions)}
              </span>
              <span className={styles.totalLabel}>
                <Translate>total contributions</Translate>
              </span>
              {period(user.node) && (
                <span className={styles.totalLabel}>
                  {period(user.node).recent ? (
                    <>
                      <Translate>Contributing since</Translate> {period(user.node).first}
                    </>
                  ) : (
                    <>
                      <Translate>Contributed</Translate> {period(user.node).first}
                      {period(user.node).last && period(user.node).last !== period(user.node).first
                        ? ` – ${period(user.node).last}`
                        : ''}
                    </>
                  )}
                </span>
              )}
              <a
                className={ui.btn}
                href={'https://github.com/' + user.node.url}
                target="_blank"
                rel="noreferrer"
              >
                <UiIcon name="github" size={16} />
                <Translate>View on GitHub</Translate>
              </a>
            </div>
          )}
        </Dialog>
      </main>
    </Layout>
  );
};

export default Contributors;
