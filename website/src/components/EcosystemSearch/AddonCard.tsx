import UiIcon from '../ui/Icons';
import ui from '../ui/Ui.module.scss';
import CardLogo from './CardLogo';
import styles from './Ecosystem.module.scss';
import Icon from './Icon';
import { Addon, VulnerabilitySeverity } from './types';

import Translate from '@docusaurus/Translate';
import clsx from 'clsx';
import * as React from 'react';
import { FC } from 'react';

const DAY_MS = 86_400_000;
const formatRelativeTime = (iso?: string): string | null => {
  if (!iso) return null;
  const ts = new Date(iso).getTime();
  if (Number.isNaN(ts)) return null;
  const days = Math.floor((Date.now() - ts) / DAY_MS);
  if (days < 1) return 'today';
  if (days < 2) return 'yesterday';
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  const years = Math.floor(days / 365);
  return `${years}y ago`;
};

const isSevere = (s: VulnerabilitySeverity): boolean => s === 'HIGH' || s === 'CRITICAL';

const AddonCard: FC<Addon> = ({
  url,
  name,
  category,
  description,
  downloads,
  latest,
  origin,
  modified,
  vulnerabilities,
  missingSince,
  repository,
  license,
}): React.ReactElement => {
  const updatedLabel = formatRelativeTime(modified);
  const updatedTitle = modified ? new Date(modified).toLocaleDateString() : undefined;
  const isMissing = !!missingSince;
  const missingTitle = missingSince
    ? `Not found in registry since ${new Date(missingSince).toLocaleDateString()} — data shown is from the last successful fetch`
    : undefined;
  const hasCves = !!vulnerabilities && vulnerabilities.count > 0;
  const cveLabel = hasCves
    ? vulnerabilities!.count === 1
      ? '1 CVE'
      : `${vulnerabilities!.count} CVEs`
    : null;
  const cveTitle = hasCves
    ? `${vulnerabilities!.highest_severity} severity — ${vulnerabilities!.ids.join(', ')}`
    : undefined;
  const cveAdvisoryUrl = hasCves
    ? `https://osv.dev/vulnerability/${vulnerabilities!.ids[0]}`
    : undefined;
  const severe = hasCves && isSevere(vulnerabilities!.highest_severity);
  const hasRepository = !!repository;
  const isGithubRepo = hasRepository && /github\.com/i.test(repository!);
  const repositoryLabel = hasRepository
    ? repository!.replace(/^https?:\/\//, '').replace(/\/$/, '')
    : null;

  return (
    <article className={clsx(styles.card, isMissing && styles.missing)}>
      <a
        className={styles.cardMain}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        title={`Show ${name} on npmjs.com`}
      >
        <div className={styles.cardHead}>
          <span className={clsx(styles.badge, origin !== 'core' && styles.badgeCommunity)}>
            <Icon category={category} />
          </span>
          <h3 className={styles.name} title={name}>
            {name}
          </h3>
          <span
            className={styles.coreLogo}
            title={origin === 'core' ? 'Verdaccio Core' : 'Community'}
          >
            <CardLogo origin={origin} />
          </span>
        </div>
        <p className={styles.desc} title={description}>
          {description}
        </p>
      </a>
      {updatedLabel && (
        <div className={styles.updated} title={updatedTitle}>
          <Translate
            id="ecosystem.addon.updated"
            description="Relative time since the addon was last published"
            values={{ when: updatedLabel }}
          >
            {'Updated {when}'}
          </Translate>
        </div>
      )}
      <div className={styles.chips}>
        <span className={ui.chip} title="Monthly downloads">
          <UiIcon name="arrowDown" size={12} />
          {new Intl.NumberFormat().format(downloads)}
        </span>
        <span className={ui.chip} title="Latest version">
          v{latest}
        </span>
        {isMissing && (
          <span className={clsx(ui.chip, ui.chipWarn)} title={missingTitle}>
            <UiIcon name="linkOff" size={12} />
            UNPUBLISHED
          </span>
        )}
        {hasCves && (
          <a
            className={clsx(ui.chip, ui.chipWarn)}
            href={cveAdvisoryUrl}
            target="_blank"
            rel="noopener noreferrer"
            title={cveTitle}
            style={severe ? { background: 'var(--v-accent)' } : undefined}
          >
            <UiIcon name="warning" size={12} />
            {cveLabel}
          </a>
        )}
        <a
          className={styles.visit}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          title="Show package on npmjs.com"
        >
          <Translate>Visit</Translate> →
        </a>
      </div>
      <div className={styles.foot}>
        <div className={styles.footRow}>
          {hasRepository ? (
            <>
              <UiIcon name={isGithubRepo ? 'github' : 'code'} size={12} />
              <a
                className={styles.footLink}
                href={repository}
                target="_blank"
                rel="noopener noreferrer"
                title={`Open source code: ${repository}`}
              >
                {repositoryLabel}
              </a>
            </>
          ) : (
            <>
              <UiIcon name="codeOff" size={12} />
              <span className={styles.muted} title="No repository URL declared in package.json">
                <Translate>Source code unavailable</Translate>
              </span>
            </>
          )}
          {license ? (
            <span className={styles.license} title={`License: ${license}`}>
              {license}
            </span>
          ) : (
            <span
              className={clsx(styles.license, styles.muted)}
              style={{ border: 0 }}
              title="No license field declared in package.json"
            >
              <Translate>No license provided</Translate>
            </span>
          )}
        </div>
        <div className={styles.footRow}>
          {hasCves ? (
            <>
              <span className={severe ? styles.danger : styles.warn}>
                <UiIcon name="warning" size={12} />
              </span>
              <a
                className={styles.footLink}
                href={cveAdvisoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                title={cveTitle}
              >
                {vulnerabilities!.ids[0]}
                {vulnerabilities!.count > 1 ? ` +${vulnerabilities!.count - 1} more` : ''}
              </a>
            </>
          ) : (
            <>
              <span className={styles.ok}>
                <UiIcon name="checkCircle" size={12} />
              </span>
              <a
                className={styles.footLink}
                href={`https://osv.dev/list?ecosystem=npm&q=${encodeURIComponent(name)}`}
                target="_blank"
                rel="noopener noreferrer"
                title={`Verify on OSV.dev: ${name}`}
              >
                <Translate>No vulnerabilities found</Translate>
              </a>
            </>
          )}
        </div>
      </div>
    </article>
  );
};

export default AddonCard;
