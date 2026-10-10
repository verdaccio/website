import {
  Caption,
  DESKTOP,
  Frame,
  Layout,
  MOBILE,
  Pill,
  Pkt,
  Pt,
  Root,
  box,
  lerp,
  rails,
  styles,
} from './shared';
import type { Variant } from './shared';

import clsx from 'clsx';
import React from 'react';

const ARIA =
  'Animation: Verdaccio asks every configured uplink for a package. npmjs answers, a slow mirror times out and an unreachable one is refused; the failing uplinks are skipped and the healthy answer is served.';

const TEXT = {
  desktop: {
    client: ['Your team', 'pnpm add react'],
    targets: [
      { name: 'npmjs', url: 'registry.npmjs.org', pill: '200 OK · 142ms', ok: true },
      { name: 'server2', url: 'mirror.local.net', pill: 'TIMEOUT 100ms', ok: false },
      { name: 'baduplink', url: 'localhost:55666', pill: 'ECONNREFUSED', ok: false },
    ],
    pillW: 170,
    caps: [
      ['1 · Verdaccio asks every uplink for the package'],
      ['2 · Slow or broken uplinks fail fast and are skipped'],
      ['3 · Healthy answers are merged and served once'],
    ],
  },
  mobile: {
    client: ['Client', 'pnpm install'],
    targets: [
      { name: 'npmjs', url: 'npmjs.org', pill: '200 OK', ok: true },
      { name: 'server2', url: 'mirror.local', pill: 'TIMEOUT', ok: false },
      { name: 'baduplink', url: 'localhost', pill: 'REFUSED', ok: false },
    ],
    pillW: 80,
    caps: [
      ['1 · Verdaccio asks every', 'uplink for the package'],
      ['2 · Slow or broken uplinks fail', 'fast and are skipped'],
      ['3 · Healthy answers are merged', 'and served once'],
    ],
  },
};

const Diagram = ({ variant, l }: { variant: Variant; l: Layout }): React.ReactElement => {
  const t = TEXT[variant];
  const mobile = variant === 'mobile';
  const core = l.core;
  const starts: Pt[] = l.targetIn.map((p) => lerp(l.coreOut, p, 0.12));
  const ends: Pt[] = l.targetIn.map((p) => lerp(l.coreOut, p, 0.88));

  return (
    <Frame variant={variant} viewBox={l.viewBox} label={ARIA}>
      {rails(l)}

      <rect {...box(l.client)} rx="14" className={styles.node} />
      <text x={l.client.x + 18} y={l.client.y + (mobile ? 28 : 38)} className={styles.title}>
        {t.client[0]}
      </text>
      <text x={l.client.x + 18} y={l.client.y + (mobile ? 48 : 62)} className={styles.mono}>
        {t.client[1]}
      </text>

      <rect {...box(core)} rx="18" className={styles.core} />
      <text x={core.x + 24} y={core.y + 38} className={styles.coreTitle}>
        verdaccio
      </text>
      <text x={core.x + core.w - 24} y={core.y + 38} textAnchor="end" className={styles.coreMono}>
        :4873
      </text>
      <Pill
        x={core.x + core.w / 2 - 80}
        y={core.y + core.h - 52}
        w={160}
        text="MERGED METADATA"
        onCore
        show="showC"
      />
      {!mobile && (
        <g>
          <rect
            x={core.x + 24}
            y={core.y + 62}
            width={core.w - 48}
            height="100"
            rx="10"
            className={styles.tpl}
          />
          <text x={core.x + 40} y={core.y + 86} className={styles.tplLabel}>
            UPLINKS
          </text>
          {['npmjs', 'server2', 'baduplink'].map((n, i) => (
            <text key={n} x={core.x + 40} y={core.y + 110 + i * 20} className={styles.tplText}>
              {n}
            </text>
          ))}
        </g>
      )}

      {l.targets.map((b, i) => (
        <g key={t.targets[i].name} className={i > 0 ? styles.dim : undefined}>
          <rect {...box(b)} rx="14" className={styles.node} />
          <text x={b.x + (mobile ? 12 : 22)} y={b.y + 28} className={styles.title}>
            {t.targets[i].name}
          </text>
          <text
            x={b.x + (mobile ? 12 : 22)}
            y={b.y + 48}
            className={clsx(styles.mono, mobile && styles.monoSm)}
          >
            {t.targets[i].url}
          </text>
          <Pill
            x={b.x + (mobile ? 10 : 22)}
            y={b.y + 64}
            w={t.pillW}
            text={t.targets[i].pill}
            ok={t.targets[i].ok}
            show={t.targets[i].ok ? 'showB' : 'showA'}
          />
        </g>
      ))}

      <Pkt slot="pktIn" from={l.clientExit} to={l.coreEntry} label="GET react" />
      {starts.map((s, i) => (
        <Pkt key={i} slot="pktFan" from={s} to={ends[i]} label="GET react" />
      ))}
      <Pkt slot="pktBack" from={ends[0]} to={starts[0]} label="react.json" data />
      <Pkt slot="pktOut" from={l.coreEntry} to={l.clientExit} label="react.json" data />

      <Caption
        cls="capA"
        lines={t.caps[0]}
        x={l.captionPos[0]}
        y={l.captionPos[1]}
        lh={l.captionLh}
      />
      <Caption
        cls="capB"
        lines={t.caps[1]}
        x={l.captionPos[0]}
        y={l.captionPos[1]}
        lh={l.captionLh}
      />
      <Caption
        cls="capC"
        lines={t.caps[2]}
        x={l.captionPos[0]}
        y={l.captionPos[1]}
        lh={l.captionLh}
      />
    </Frame>
  );
};

const UplinksFlow = (): React.ReactElement => (
  <Root>
    <Diagram variant="desktop" l={DESKTOP} />
    <Diagram variant="mobile" l={MOBILE} />
  </Root>
);

export default UplinksFlow;
