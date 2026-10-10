import styles from './Home.module.scss';

import clsx from 'clsx';
import copy from 'copy-text-to-clipboard';
import React, { useState } from 'react';

type Tab = { label: string; command: string };

const CommandTabs = ({ tabs }: { tabs: Tab[] }): React.ReactElement => {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const { command } = tabs[active];

  const onCopy = () => {
    copy(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
        <button type="button" className={styles.copy} onClick={onCopy} aria-label="Copy command">
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
    </div>
  );
};

export default CommandTabs;
