import styles from './Terminal.module.scss';

import clsx from 'clsx';
import React from 'react';

export type Part = [text: string, color?: string];
export type TermLine = {
  row: number;
  // percent of the loop at which the line appears
  at: number;
  transient?: boolean;
  parts: Part[];
};

const ROW = 20;
const TOP = 62;
const DEFAULT_WIDTH = 880;

type Props = {
  title: string;
  label: string;
  rows: number;
  lines: TermLine[];
  cursorRow?: number;
  // drawing width; a narrower one makes the text bigger when the terminal sits in a small column
  width?: number;
  // no outer margin, for terminals stacked by their parent
  flush?: boolean;
};

const Terminal = ({
  title,
  label,
  rows,
  lines,
  cursorRow,
  width = DEFAULT_WIDTH,
  flush,
}: Props): React.ReactElement => {
  const height = TOP + rows * ROW + 20;
  return (
    <div className={clsx(styles.wrap, flush && styles.flush)}>
      <svg className={styles.svg} viewBox={`0 0 ${width} ${height}`} role="img" aria-label={label}>
        <rect width={width} height={height} className={styles.bg} />
        <rect width={width} height="38" className={styles.bar} />
        <circle cx="22" cy="19" r="6" className={styles.dotR} />
        <circle cx="42" cy="19" r="6" className={styles.dotY} />
        <circle cx="62" cy="19" r="6" className={styles.dotG} />
        <text x={width / 2} y="23" textAnchor="middle" className={styles.title}>
          {title}
        </text>
        {lines.map((line, i) => (
          <text
            key={i}
            x="22"
            y={TOP + line.row * ROW}
            className={clsx(styles.line, line.transient ? styles.tmp : styles[`at${line.at}`])}
          >
            {line.parts.map(([text, color], j) => (
              <tspan
                key={j}
                className={
                  color
                    ? color
                        .split(' ')
                        .map((c) => styles[c])
                        .join(' ')
                    : undefined
                }
              >
                {text}
              </tspan>
            ))}
          </text>
        ))}
        {cursorRow !== undefined && (
          <rect
            x="22"
            y={TOP + cursorRow * ROW - 12}
            width="8"
            height="16"
            className={styles.cursor}
          />
        )}
      </svg>
    </div>
  );
};

export const Video = ({ id, title }: { id: string; title: string }): React.ReactElement => (
  <div className={styles.video}>
    <iframe
      src={`https://www.youtube.com/embed/${id}`}
      title={title}
      loading="lazy"
      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  </div>
);

export default Terminal;
