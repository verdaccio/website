import styles from './Home.module.scss';

import clsx from 'clsx';
import React, { useState } from 'react';

type Lang = 'yaml' | 'ts';
export type CodeTab = { label: string; lang: Lang; code: string; note?: string };

// Tiny highlighter: keys and keywords green, strings and urls orange, comments muted.
const PATTERNS: Record<Lang, RegExp> = {
  yaml: /('[^']*'|https?:\/\/\S+|[\w$@*/-]+(?=:))/g,
  ts: /(\/\/.*$|'[^']*'|\.\w+(?=\()|\b\w+(?=:)|\b(?:import|from|const|await)\b)/gm,
};

const classify = (token: string, lang: Lang): string | undefined => {
  if (token.startsWith('//')) return styles.c;
  if (token.startsWith("'") || token.startsWith('http')) return styles.v;
  if (lang === 'ts' && /^(import|from|const|await)$/.test(token)) return styles.k;
  return styles.k;
};

const highlight = (code: string, lang: Lang): React.ReactNode[] =>
  code.split(PATTERNS[lang]).map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className={classify(part, lang)}>
        {part}
      </span>
    ) : (
      part
    )
  );

const CodeCard = ({ tabs }: { tabs: CodeTab[] }): React.ReactElement => {
  const [active, setActive] = useState(0);
  const tab = tabs[active];
  return (
    <div className={styles.codeCard}>
      <div className={clsx(styles.codeHead, styles.mono)}>
        <span className={styles.cfgTabs} role="tablist">
          {tabs.map((t, i) => (
            <button
              key={t.label}
              type="button"
              role="tab"
              aria-selected={i === active}
              className={clsx(styles.cfgTab, i === active && styles.cfgTabActive)}
              onClick={() => setActive(i)}
            >
              {t.label}
            </button>
          ))}
        </span>
        <span>{tab.note}</span>
      </div>
      <pre className={clsx(styles.code, styles.mono)}>{highlight(tab.code, tab.lang)}</pre>
    </div>
  );
};

export default CodeCard;
