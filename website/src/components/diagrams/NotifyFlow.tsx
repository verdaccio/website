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
  'Animation: a publish reaches Verdaccio, the notify template is rendered with the package data, and one webhook request is sent to each configured endpoint, such as Slack, Google Chat or your own service.';

const TEXT = {
  desktop: {
    client: ['Developer', 'pnpm publish'],
    targets: [
      { name: 'Slack', url: 'hooks.slack.com' },
      { name: 'Google Chat', url: 'chat.googleapis.com' },
      { name: 'Your endpoint', url: 'POST any JSON API' },
    ],
    pill: 'DELIVERED · 200',
    pillW: 170,
    caps: [
      ['1 · npm publish reaches Verdaccio'],
      ['2 · The Handlebars template is rendered with the package data'],
      ['3 · Every configured endpoint gets its own POST'],
    ],
  },
  mobile: {
    client: ['Developer', 'pnpm publish'],
    targets: [
      { name: 'Slack', url: 'hooks.slack' },
      { name: 'Chat', url: 'googleapis' },
      { name: 'Custom', url: 'any JSON API' },
    ],
    pill: '200 OK',
    pillW: 80,
    caps: [
      ['1 · npm publish reaches', 'Verdaccio'],
      ['2 · The template is rendered', 'with the package data'],
      ['3 · Every endpoint gets', 'its own POST'],
    ],
  },
};

const Diagram = ({ variant, l }: { variant: Variant; l: Layout }): React.ReactElement => {
  const t = TEXT[variant];
  const mobile = variant === 'mobile';
  const core = l.core;
  const starts: Pt[] = l.targetIn.map((p) => lerp(l.coreOut, p, 0.12));
  const ends: Pt[] = l.targetIn.map((p) => lerp(l.coreOut, p, 0.88));
  const tpl = {
    x: core.x + 24,
    y: core.y + (mobile ? 58 : 66),
    w: core.w - 48,
    h: mobile ? 66 : 96,
  };

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
        notify
      </text>
      <rect {...box(tpl)} rx="10" className={styles.tpl} />
      <g className={styles.showD}>
        <text x={tpl.x + 16} y={tpl.y + 26} className={styles.tplLabel}>
          TEMPLATE
        </text>
        <text x={tpl.x + 16} y={tpl.y + (mobile ? 50 : 62)} className={styles.tplText}>
          {'{{ name }}'}
        </text>
      </g>
      <g className={styles.showE}>
        <text x={tpl.x + 16} y={tpl.y + 26} className={styles.tplLabel}>
          RENDERED
        </text>
        <text x={tpl.x + 16} y={tpl.y + (mobile ? 50 : 62)} className={styles.tplText}>
          my-pkg
        </text>
      </g>

      {l.targets.map((b, i) => (
        <g key={t.targets[i].name}>
          <rect {...box(b)} rx="14" className={styles.node} />
          <text
            x={b.x + (mobile ? 12 : 22)}
            y={b.y + 28}
            className={clsx(styles.title, mobile && styles.titleSm)}
          >
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
            text={t.pill}
            ok
            show="showF"
          />
        </g>
      ))}

      <Pkt slot="pktPublish" from={l.clientExit} to={l.coreEntry} label="PUT my-pkg" />
      {starts.map((s, i) => (
        <Pkt key={i} slot="pktPost" from={s} to={ends[i]} label="POST json" data />
      ))}

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

const NotifyFlow = (): React.ReactElement => (
  <Root>
    <Diagram variant="desktop" l={DESKTOP} />
    <Diagram variant="mobile" l={MOBILE} />
  </Root>
);

export default NotifyFlow;
