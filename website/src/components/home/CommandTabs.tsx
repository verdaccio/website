import CopyButton from './CopyButton';
import styles from './Home.module.scss';

import clsx from 'clsx';
import React, { useState } from 'react';

type Tab = { label: string; command: string };

const CommandTabs = ({ tabs }: { tabs: Tab[] }): React.ReactElement => {
  const [active, setActive] = useState(0);
  const { command } = tabs[active];

  return (
    <div className={styles.cmd}>
      {tabs.length > 1 && (
        <div className={styles.cmdTabs} role="tablist">
          {tabs.map((tab, i) => (
            <button
              key={tab.label}
              type="button"
              role="tab"
              aria-selected={i === active}
              className={clsx(styles.cmdTab, i === active && styles.cmdTabActive)}
              onClick={() => setActive(i)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}
      <div className={styles.cmdBody}>
        <code>
          <span className={styles.cmdPrompt}>$</span>
          {command}
        </code>
        <CopyButton command={command} />
      </div>
    </div>
  );
};

export default CommandTabs;
