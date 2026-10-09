import styles from './Home.module.scss';

import React from 'react';

// 12s loop. Round 1: install misses the cache, the tarball comes from the uplink and is stored.
// Round 2: the same install is served from the cache and the uplink is never contacted.
const ARIA =
  "Animation: the first install is fetched from the npmjs uplink and stored in Verdaccio's cache. The next install is served from the cache without contacting the uplink.";

const CacheFlowDesktop = (): React.ReactElement => (
  <svg
    className={`${styles.cacheFlow} ${styles.cfDesktop}`}
    viewBox="0 0 1100 300"
    role="img"
    aria-label={ARIA}
  >
    {/* rails */}
    <line x1="230" y1="150" x2="410" y2="150" className={styles.cfRail} />
    <line x1="700" y1="150" x2="880" y2="150" className={styles.cfRail} />

    {/* client */}
    <g>
      <rect x="40" y="95" width="190" height="110" rx="14" className={styles.cfNode} />
      <text x="62" y="128" className={styles.cfTitle}>
        Your team
      </text>
      <text x="62" y="152" className={styles.cfMono}>
        pnpm · npm · yarn
      </text>
      <text x="62" y="176" className={styles.cfMono}>
        CI runners
      </text>
    </g>

    {/* verdaccio */}
    <g>
      <rect x="400" y="50" width="310" height="200" rx="18" className={styles.cfCore} />
      <text x="424" y="84" className={styles.cfCoreTitle}>
        verdaccio
      </text>
      <text x="686" y="84" textAnchor="end" className={styles.cfCoreMono}>
        :4873
      </text>
      <rect x="424" y="104" width="124" height="116" rx="10" className={styles.cfInner} />
      <text x="440" y="130" className={styles.cfTiny}>
        PRIVATE
      </text>
      <text x="440" y="154" className={styles.cfInnerText}>
        @acme/*
      </text>
      <text x="440" y="174" className={styles.cfTiny}>
        storage
      </text>
      <rect x="562" y="104" width="124" height="116" rx="10" className={styles.cfCacheEmpty} />
      <rect x="562" y="104" width="124" height="116" rx="10" className={styles.cfCacheFull} />
      <g className={styles.cfEmptyLabels}>
        <text x="578" y="130" className={styles.cfTinyOn}>
          CACHE
        </text>
        <text x="578" y="154" className={styles.cfEmptyText}>
          empty
        </text>
      </g>
      <g className={styles.cfStored}>
        <text x="578" y="130" className={styles.cfTiny}>
          CACHE
        </text>
        <text x="578" y="154" className={styles.cfInnerText}>
          react
        </text>
        <text x="578" y="174" className={styles.cfTiny}>
          tarball
        </text>
      </g>
      <g className={styles.cfStored}>
        <circle cx="662" cy="196" r="9" className={styles.cfDot} />
        <path d="M657 196l3.5 3.5 6-7" className={styles.cfCheck} />
      </g>
    </g>

    {/* uplink */}
    <g className={styles.cfUplink}>
      <rect x="880" y="95" width="180" height="110" rx="14" className={styles.cfNode} />
      <text x="902" y="128" className={styles.cfTitle}>
        Uplink
      </text>
      <text x="902" y="152" className={styles.cfMono}>
        registry.npmjs.org
      </text>
      <text x="902" y="176" className={styles.cfMono}>
        or any registry
      </text>
    </g>

    {/* badges */}
    <g className={styles.cfMiss}>
      <rect x="470" y="14" width="170" height="26" rx="13" className={styles.cfBadgeMiss} />
      <text x="555" y="31.5" textAnchor="middle" className={styles.cfBadgeText}>
        CACHE MISS → UPLINK
      </text>
    </g>
    <g className={styles.cfHit}>
      <rect x="470" y="14" width="170" height="26" rx="13" className={styles.cfBadgeHit} />
      <text x="555" y="31.5" textAnchor="middle" className={styles.cfBadgeTextHit}>
        CACHE HIT · NO UPLINK
      </text>
    </g>

    {/* packets */}
    <g className={styles.cfPktA}>
      <rect x="-34" y="-12" width="68" height="24" rx="12" className={styles.cfReq} />
      <text y="4" textAnchor="middle" className={styles.cfPktText}>
        GET react
      </text>
    </g>
    <g className={styles.cfPktB}>
      <rect x="-34" y="-12" width="68" height="24" rx="12" className={styles.cfTar} />
      <text y="4" textAnchor="middle" className={styles.cfPktTextOn}>
        react.tgz
      </text>
    </g>
    <g className={styles.cfPktC}>
      <rect x="-34" y="-12" width="68" height="24" rx="12" className={styles.cfTar} />
      <text y="4" textAnchor="middle" className={styles.cfPktTextOn}>
        react.tgz
      </text>
    </g>
    <g className={styles.cfPktD}>
      <rect x="-34" y="-12" width="68" height="24" rx="12" className={styles.cfReq} />
      <text y="4" textAnchor="middle" className={styles.cfPktText}>
        GET react
      </text>
    </g>
    <g className={styles.cfPktE}>
      <rect x="-34" y="-12" width="68" height="24" rx="12" className={styles.cfTar} />
      <text y="4" textAnchor="middle" className={styles.cfPktTextOn}>
        react.tgz
      </text>
    </g>

    {/* captions */}
    <text x="550" y="282" textAnchor="middle" className={`${styles.cfCaption} ${styles.cfCap1}`}>
      1 · First install: not in cache, fetched from the uplink
    </text>
    <text x="550" y="282" textAnchor="middle" className={`${styles.cfCaption} ${styles.cfCap2}`}>
      2 · Tarball stored locally, then served to your client
    </text>
    <text x="550" y="282" textAnchor="middle" className={`${styles.cfCaption} ${styles.cfCap3}`}>
      3 · Every next install: served from cache, the uplink is never touched
    </text>
  </svg>
);

const Pkt = ({ cls, label, req }: { cls: string; label: string; req?: boolean }) => (
  <g className={cls}>
    <rect
      x="-34"
      y="-12"
      width="68"
      height="24"
      rx="12"
      className={req ? styles.cfReq : styles.cfTar}
    />
    <text y="4" textAnchor="middle" className={req ? styles.cfPktText : styles.cfPktTextOn}>
      {label}
    </text>
  </g>
);

// Narrow screens: same story laid out vertically so the text stays readable.
const CacheFlowMobile = (): React.ReactElement => (
  <svg
    className={`${styles.cacheFlow} ${styles.cfMobile}`}
    viewBox="0 0 360 580"
    role="img"
    aria-label={ARIA}
  >
    <line x1="180" y1="90" x2="180" y2="150" className={styles.cfRail} />
    <line x1="180" y1="380" x2="180" y2="440" className={styles.cfRail} />

    <g>
      <rect x="40" y="10" width="280" height="80" rx="14" className={styles.cfNode} />
      <text x="62" y="42" className={styles.cfTitle}>
        Your team
      </text>
      <text x="62" y="64" className={styles.cfMono}>
        pnpm · npm · yarn · CI runners
      </text>
    </g>

    <g>
      <rect x="20" y="150" width="320" height="230" rx="18" className={styles.cfCore} />
      <text x="42" y="186" className={styles.cfCoreTitle}>
        verdaccio
      </text>
      <text x="318" y="186" textAnchor="end" className={styles.cfCoreMono}>
        :4873
      </text>
      <rect x="40" y="210" width="130" height="150" rx="10" className={styles.cfInner} />
      <text x="56" y="236" className={styles.cfTiny}>
        PRIVATE
      </text>
      <text x="56" y="260" className={styles.cfInnerText}>
        @acme/*
      </text>
      <text x="56" y="280" className={styles.cfTiny}>
        storage
      </text>
      <rect x="190" y="210" width="130" height="150" rx="10" className={styles.cfCacheEmpty} />
      <rect x="190" y="210" width="130" height="150" rx="10" className={styles.cfCacheFull} />
      <g className={styles.cfEmptyLabels}>
        <text x="206" y="236" className={styles.cfTinyOn}>
          CACHE
        </text>
        <text x="206" y="260" className={styles.cfEmptyText}>
          empty
        </text>
      </g>
      <g className={styles.cfStored}>
        <text x="206" y="236" className={styles.cfTiny}>
          CACHE
        </text>
        <text x="206" y="260" className={styles.cfInnerText}>
          react
        </text>
        <text x="206" y="280" className={styles.cfTiny}>
          tarball
        </text>
        <circle cx="296" cy="338" r="9" className={styles.cfDot} />
        <path d="M291 338l3.5 3.5 6-7" className={styles.cfCheck} />
      </g>
    </g>

    <g className={styles.cfUplink}>
      <rect x="40" y="440" width="280" height="80" rx="14" className={styles.cfNode} />
      <text x="62" y="472" className={styles.cfTitle}>
        Uplink
      </text>
      <text x="62" y="494" className={styles.cfMono}>
        registry.npmjs.org or any registry
      </text>
    </g>

    <g className={styles.cfMiss}>
      <rect x="95" y="107" width="170" height="26" rx="13" className={styles.cfBadgeMiss} />
      <text x="180" y="124.5" textAnchor="middle" className={styles.cfBadgeText}>
        CACHE MISS → UPLINK
      </text>
    </g>
    <g className={styles.cfHit}>
      <rect x="95" y="107" width="170" height="26" rx="13" className={styles.cfBadgeHit} />
      <text x="180" y="124.5" textAnchor="middle" className={styles.cfBadgeTextHit}>
        CACHE HIT · NO UPLINK
      </text>
    </g>

    <Pkt cls={styles.cfMPktA} label="GET react" req />
    <Pkt cls={styles.cfMPktB} label="react.tgz" />
    <Pkt cls={styles.cfMPktC} label="react.tgz" />
    <Pkt cls={styles.cfMPktD} label="GET react" req />
    <Pkt cls={styles.cfMPktE} label="react.tgz" />

    <text textAnchor="middle" className={`${styles.cfCaption} ${styles.cfCap1}`}>
      <tspan x="180" y="552">
        1 · First install: not in cache,
      </tspan>
      <tspan x="180" y="572">
        fetched from the uplink
      </tspan>
    </text>
    <text textAnchor="middle" className={`${styles.cfCaption} ${styles.cfCap2}`}>
      <tspan x="180" y="552">
        2 · Tarball stored locally,
      </tspan>
      <tspan x="180" y="572">
        then served to your client
      </tspan>
    </text>
    <text textAnchor="middle" className={`${styles.cfCaption} ${styles.cfCap3}`}>
      <tspan x="180" y="552">
        3 · Every next install is served
      </tspan>
      <tspan x="180" y="572">
        from cache. Uplink untouched
      </tspan>
    </text>
  </svg>
);

const CacheFlow = (): React.ReactElement => (
  <>
    <CacheFlowDesktop />
    <CacheFlowMobile />
  </>
);

export default CacheFlow;
