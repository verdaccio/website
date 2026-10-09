import styles from './Diagrams.module.scss';

import clsx from 'clsx';
import React from 'react';

export type Pt = [number, number];
export type Variant = 'desktop' | 'mobile';

export const box = (r: { x: number; y: number; w: number; h: number }) => ({
  x: r.x,
  y: r.y,
  width: r.w,
  height: r.h,
});

export const lerp = (a: Pt, b: Pt, t: number): Pt => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
];

type PktProps = {
  slot: string;
  from: Pt;
  to: Pt;
  label: string;
  data?: boolean;
};

// A labelled chip that travels from `from` to `to` during the keyframes of `slot`.
export const Pkt = ({ slot, from, to, label, data }: PktProps): React.ReactElement => (
  <g
    className={clsx(styles.pkt, styles[slot])}
    style={
      {
        '--ax': `${from[0]}px`,
        '--ay': `${from[1]}px`,
        '--bx': `${to[0]}px`,
        '--by': `${to[1]}px`,
      } as React.CSSProperties
    }
  >
    <rect
      x="-44"
      y="-12"
      width="88"
      height="24"
      rx="12"
      className={data ? styles.pktData : styles.pktReq}
    />
    <text y="4" textAnchor="middle" className={data ? styles.pktTextOn : styles.pktText}>
      {label}
    </text>
  </g>
);

type PillProps = {
  x: number;
  y: number;
  w: number;
  text: string;
  ok?: boolean;
  onCore?: boolean;
  show: string;
};

export const Pill = ({ x, y, w, text, ok, onCore, show }: PillProps): React.ReactElement => (
  <g className={styles[show]}>
    <rect
      x={x}
      y={y}
      width={w}
      height="24"
      rx="12"
      className={onCore ? styles.pillOnCore : ok ? styles.pillOk : styles.pillBad}
    />
    <text
      x={x + w / 2}
      y={y + 16}
      textAnchor="middle"
      className={onCore ? styles.pillTextOnCore : styles.pillText}
    >
      {text}
    </text>
  </g>
);

// Desktop shows the horizontal layout, mobile the vertical one; CSS picks one.
export const Frame = ({
  variant,
  viewBox,
  label,
  children,
}: {
  variant: Variant;
  viewBox: string;
  label: string;
  children: React.ReactNode;
}): React.ReactElement => (
  <svg
    className={clsx(styles.svg, variant === 'desktop' ? styles.desktop : styles.mobile)}
    viewBox={viewBox}
    role="img"
    aria-label={label}
  >
    {children}
  </svg>
);

export const Root = ({ children }: { children: React.ReactNode }): React.ReactElement => (
  <div className={styles.root}>{children}</div>
);

type CaptionProps = {
  cls: 'capA' | 'capB' | 'capC';
  lines: string[];
  x: number;
  y: number;
  lh?: number;
};

export const Caption = ({ cls, lines, x, y, lh = 20 }: CaptionProps): React.ReactElement => (
  <text textAnchor="middle" className={clsx(styles.caption, styles[cls])}>
    {lines.map((line, i) => (
      <tspan key={line} x={x} y={y + i * lh}>
        {line}
      </tspan>
    ))}
  </text>
);

// geometry shared by both diagrams: one source, three targets
export type Layout = {
  viewBox: string;
  client: { x: number; y: number; w: number; h: number };
  core: { x: number; y: number; w: number; h: number };
  targets: { x: number; y: number; w: number; h: number }[];
  clientEdge: Pt;
  coreEdge: Pt;
  clientExit: Pt; // where the client packet leaves/enters
  coreEntry: Pt;
  coreOut: Pt; // point on the core edge that targets hang from
  targetIn: Pt[]; // point on each target edge the rails land on
  captionPos: Pt;
  captionLh: number;
};

export const DESKTOP: Layout = {
  viewBox: '0 0 1000 450',
  client: { x: 20, y: 165, w: 150, h: 90 },
  core: { x: 250, y: 90, w: 270, h: 240 },
  targets: [15, 160, 305].map((y) => ({ x: 720, y, w: 260, h: 100 })),
  clientEdge: [170, 210],
  coreEdge: [250, 210],
  clientExit: [200, 210],
  coreEntry: [270, 210],
  coreOut: [520, 210],
  targetIn: [65, 210, 355].map((y): Pt => [720, y]),
  captionPos: [500, 436],
  captionLh: 20,
};

export const MOBILE: Layout = {
  viewBox: '0 0 360 580',
  client: { x: 110, y: 10, w: 140, h: 60 },
  core: { x: 20, y: 120, w: 320, h: 150 },
  targets: [10, 130, 250].map((x) => ({ x, y: 400, w: 100, h: 100 })),
  clientEdge: [180, 70],
  coreEdge: [180, 120],
  clientExit: [180, 84],
  coreEntry: [180, 140],
  coreOut: [180, 270],
  targetIn: [60, 180, 300].map((x): Pt => [x, 400]),
  captionPos: [180, 540],
  captionLh: 20,
};

export const rails = (l: Layout): React.ReactElement => (
  <>
    <line
      x1={l.clientEdge[0]}
      y1={l.clientEdge[1]}
      x2={l.coreEdge[0]}
      y2={l.coreEdge[1]}
      className={styles.rail}
    />
    {l.targetIn.map((t, i) => (
      <line
        key={i}
        x1={l.coreOut[0]}
        y1={l.coreOut[1]}
        x2={t[0]}
        y2={t[1]}
        className={styles.rail}
      />
    ))}
  </>
);

export { styles };
