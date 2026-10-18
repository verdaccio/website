import styles from './FilterFlow.module.scss';

import clsx from 'clsx';
import React from 'react';

type Variant = 'desktop' | 'mobile';
type Pt = [number, number];

const ARIA =
  'Animation: Verdaccio reads the package manifest from the uplink, which lists three versions. The package filter applies its rules, hides version 1.2.0 and the client only sees 1.0.0 and 1.1.0.';

const VERSIONS = ['1.0.0', '1.1.0', '1.2.0'];
// the version the rule blocks
const BLOCKED = 2;

type Geometry = {
  viewBox: string;
  chipW: number;
  source: { x: number; y: number; w: number; h: number };
  filter: { x: number; y: number; w: number; h: number };
  client: { x: number; y: number; w: number; h: number };
  // position of lane `i` at a point `a` along the flow axis
  at: (i: number, a: number) => Pt;
  start: number;
  stop: number;
  end: number;
  lanes: number[];
  caption: Pt;
};

const DESKTOP: Geometry = {
  viewBox: '0 0 1000 420',
  chipW: 88,
  source: { x: 20, y: 70, w: 190, h: 230 },
  filter: { x: 380, y: 20, w: 240, h: 350 },
  client: { x: 790, y: 70, w: 190, h: 230 },
  lanes: [140, 190, 240],
  start: 115,
  stop: 500,
  end: 885,
  at: (i, a) => [a, DESKTOP.lanes[i]],
  caption: [500, 405],
};

const MOBILE: Geometry = {
  viewBox: '0 0 360 690',
  chipW: 76,
  source: { x: 20, y: 10, w: 320, h: 100 },
  filter: { x: 20, y: 220, w: 320, h: 230 },
  client: { x: 20, y: 560, w: 320, h: 100 },
  lanes: [70, 180, 290],
  start: 82,
  stop: 315,
  end: 610,
  at: (i, a) => [MOBILE.lanes[i], a],
  caption: [180, 686],
};

const box = (r: { x: number; y: number; w: number; h: number }) => ({
  x: r.x,
  y: r.y,
  width: r.w,
  height: r.h,
});

const vars = (from: Pt, via: Pt, to: Pt): React.CSSProperties =>
  ({
    '--ax': `${from[0]}px`,
    '--ay': `${from[1]}px`,
    '--fx': `${via[0]}px`,
    '--fy': `${via[1]}px`,
    '--bx': `${to[0]}px`,
    '--by': `${to[1]}px`,
  }) as React.CSSProperties;

const Chip = ({ w, label, red }: { w: number; label: string; red?: boolean }) => (
  <>
    <rect
      x={-w / 2}
      y="-13"
      width={w}
      height="26"
      rx="13"
      className={red ? styles.fChipBad : styles.fChip}
    />
    <text y="4" textAnchor="middle" className={red ? styles.fChipBadText : styles.fChipText}>
      {label}
    </text>
  </>
);

const Diagram = ({ variant, g }: { variant: Variant; g: Geometry }): React.ReactElement => {
  const mobile = variant === 'mobile';
  const f = g.filter;
  const blockedAt = g.at(BLOCKED, g.stop);
  const rule = mobile
    ? ['package: my-lib', "versions: '1.2.0'"]
    : ['block:', '  - package: my-lib', "    versions: '1.2.0'"];

  return (
    <svg
      className={clsx(styles.fSvg, mobile ? styles.fMobile : styles.fDesktop)}
      viewBox={g.viewBox}
      role="img"
      aria-label={ARIA}
    >
      {VERSIONS.map((_, i) => (
        <g key={i}>
          <line
            x1={g.at(i, g.start)[0]}
            y1={g.at(i, g.start)[1]}
            x2={g.at(i, g.end)[0]}
            y2={g.at(i, g.end)[1]}
            className={styles.fRail}
          />
        </g>
      ))}

      <rect {...box(g.source)} rx="14" className={styles.fNode} />
      <text x={g.source.x + 18} y={g.source.y + 30} className={styles.fTitle}>
        Uplink
      </text>
      <text x={g.source.x + 18} y={g.source.y + 50} className={styles.fMono}>
        registry.npmjs.org
      </text>

      <rect {...box(f)} rx="18" className={styles.fCore} />
      <text x={f.x + 24} y={f.y + 38} className={styles.fCoreTitle}>
        package filter
      </text>
      <text x={f.x + f.w - 24} y={f.y + 38} textAnchor="end" className={styles.fCoreMono}>
        verdaccio
      </text>
      <g className={styles.fRule}>
        <rect
          x={f.x + 24}
          y={f.y + f.h - (mobile ? 76 : 86)}
          width={f.w - 48}
          height={mobile ? 52 : 66}
          rx="10"
          className={styles.fRuleBox}
        />
        {rule.map((line, i) => (
          <text
            key={line}
            x={f.x + 38}
            y={f.y + f.h - (mobile ? 54 : 64) + i * 18}
            className={styles.fRuleText}
          >
            {line}
          </text>
        ))}
      </g>

      <rect {...box(g.client)} rx="14" className={styles.fNode} />
      <text x={g.client.x + 18} y={g.client.y + 30} className={styles.fTitle}>
        Client
      </text>
      <text x={g.client.x + 18} y={g.client.y + 50} className={styles.fMono}>
        pnpm view my-lib
      </text>

      {VERSIONS.map((version, i) => {
        const from = g.at(i, g.start);
        const via = g.at(i, g.stop);
        const to = g.at(i, g.end);
        return i === BLOCKED ? (
          <g
            key={version}
            className={clsx(styles.fPkt, styles.fPktBlocked)}
            style={vars(from, via, to)}
          >
            <g className={styles.fBeforeFilter}>
              <Chip w={g.chipW} label={version} />
            </g>
            <g className={styles.fAfterFilter}>
              <Chip w={g.chipW} label={version} red />
            </g>
          </g>
        ) : (
          <g
            key={version}
            className={clsx(styles.fPkt, styles.fPktPass)}
            style={vars(from, via, to)}
          >
            <Chip w={g.chipW} label={version} />
          </g>
        );
      })}

      <g className={styles.fBlockedPill}>
        <rect
          x={blockedAt[0] - (mobile ? 56 : 62)}
          y={blockedAt[1] + 20}
          width={mobile ? 112 : 124}
          height="24"
          rx="12"
          className={styles.fPillBad}
        />
        <text
          x={blockedAt[0]}
          y={blockedAt[1] + 36}
          textAnchor="middle"
          className={styles.fPillText}
        >
          HIDDEN
        </text>
      </g>

      <text textAnchor="middle" className={clsx(styles.fCaption, styles.fCapA)}>
        <tspan x={g.caption[0]} y={g.caption[1]}>
          {mobile
            ? '1 · Verdaccio reads the manifest'
            : '1 · Verdaccio reads the manifest from the uplink'}
        </tspan>
      </text>
      <text textAnchor="middle" className={clsx(styles.fCaption, styles.fCapB)}>
        <tspan x={g.caption[0]} y={g.caption[1]}>
          {mobile
            ? '2 · The rules hide 1.2.0'
            : '2 · The filter rules hide the version you blocked'}
        </tspan>
      </text>
      <text textAnchor="middle" className={clsx(styles.fCaption, styles.fCapC)}>
        <tspan x={g.caption[0]} y={g.caption[1]}>
          {mobile
            ? '3 · The client only sees the rest'
            : '3 · The client only sees the versions that are left'}
        </tspan>
      </text>
    </svg>
  );
};

const FilterFlow = (): React.ReactElement => (
  <div className={styles.fRoot}>
    <Diagram variant="desktop" g={DESKTOP} />
    <Diagram variant="mobile" g={MOBILE} />
  </div>
);

export default FilterFlow;
