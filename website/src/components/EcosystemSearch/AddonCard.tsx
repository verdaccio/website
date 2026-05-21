import Translate from '@docusaurus/Translate';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { green, red } from '@mui/material/colors';
import * as React from 'react';
import { FC } from 'react';

import CardLogo from './CardLogo';
import Icon from './Icon';
import { Addon, VulnerabilitySeverity } from './types';

const AVATAR_SIZE = 28;

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

const severityColor = (
  s: VulnerabilitySeverity
): 'warning' | 'error' => (s === 'HIGH' || s === 'CRITICAL' ? 'error' : 'warning');

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
}): React.ReactElement => {
  const openPackage = () => window.open(url, '_blank', 'noopener,noreferrer');
  const updatedLabel = formatRelativeTime(modified);
  const updatedTitle = modified ? new Date(modified).toLocaleDateString() : undefined;
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
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        minWidth: 240,
      }}
    >
      <CardActionArea
        onClick={openPackage}
        sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
      >
        <CardHeader
          title={name}
          slotProps={{
            title: {
              variant: 'subtitle2',
              noWrap: true,
              title: name,
              sx: { fontWeight: 600 },
            },
          }}
          sx={{ padding: 1.25, paddingBottom: 0.5 }}
          avatar={
            <Avatar
              alt={name}
              sx={{
                bgcolor: origin === 'core' ? green[200] : red[200],
                width: AVATAR_SIZE,
                height: AVATAR_SIZE,
              }}
            >
              <Icon category={category} />
            </Avatar>
          }
          action={
            <Avatar
              alt="Verdaccio"
              title={origin === 'core' ? 'Verdaccio Core' : 'Community'}
              sx={{ width: AVATAR_SIZE, height: AVATAR_SIZE, bgcolor: 'transparent' }}
            >
              <CardLogo origin={origin} />
            </Avatar>
          }
        />
        <CardContent sx={{ padding: 1.25, paddingTop: 0.5, paddingBottom: 0.5, flexGrow: 1 }}>
          <Typography
            variant="body2"
            color="text.secondary"
            title={description}
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              fontSize: '0.8rem',
              lineHeight: 1.35,
            }}
          >
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      {updatedLabel && (
        <Typography
          variant="caption"
          title={updatedTitle}
          sx={{
            display: 'block',
            paddingX: 1.25,
            paddingBottom: 0.25,
            color: 'text.secondary',
            fontSize: '0.65rem',
          }}
        >
          <Translate
            id="ecosystem.addon.updated"
            description="Relative time since the addon was last published"
            values={{ when: updatedLabel }}
          >
            {'Updated {when}'}
          </Translate>
        </Typography>
      )}
      <CardActions
        sx={{
          padding: 1,
          gap: 0.5,
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}
      >
        <Chip
          size="small"
          title="Monthly downloads"
          label={new Intl.NumberFormat().format(downloads)}
          avatar={
            <Avatar>
              <ArrowDownwardIcon sx={{ fontSize: 12 }} />
            </Avatar>
          }
          variant="outlined"
          sx={{ fontSize: '0.7rem' }}
        />
        <Chip
          size="small"
          title="Latest version"
          label={`v${latest}`}
          variant="outlined"
          sx={{ fontSize: '0.7rem' }}
        />
        {hasCves && (
          <Chip
            size="small"
            title={cveTitle}
            label={cveLabel}
            icon={<WarningAmberIcon sx={{ fontSize: 14 }} />}
            variant="filled"
            color={severityColor(vulnerabilities!.highest_severity)}
            clickable={!!cveAdvisoryUrl}
            onClick={(e) => {
              e.stopPropagation();
              if (cveAdvisoryUrl) {
                window.open(cveAdvisoryUrl, '_blank', 'noopener,noreferrer');
              }
            }}
            sx={{ fontSize: '0.7rem', fontWeight: 600 }}
          />
        )}
        <Button
          size="small"
          title="Show package on npmjs.com"
          variant="text"
          onClick={openPackage}
          sx={{ fontSize: '0.7rem', minWidth: 0, padding: '2px 8px' }}
        >
          <Translate>Visit</Translate>
        </Button>
      </CardActions>
    </Card>
  );
};

export default AddonCard;
