import Translate from '@docusaurus/Translate';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CodeIcon from '@mui/icons-material/Code';
import CodeOffIcon from '@mui/icons-material/CodeOff';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
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

const severityColor = (s: VulnerabilitySeverity): 'warning' | 'error' =>
  s === 'HIGH' || s === 'CRITICAL' ? 'error' : 'warning';

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
}): React.ReactElement => {
  const openPackage = () => window.open(url, '_blank', 'noopener,noreferrer');
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
  const hasRepository = !!repository;
  const isGithubRepo = hasRepository && /github\.com/i.test(repository!);
  const repositoryLabel = hasRepository
    ? repository!.replace(/^https?:\/\//, '').replace(/\/$/, '')
    : null;
  const openRepository = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (repository) {
      window.open(repository, '_blank', 'noopener,noreferrer');
    }
  };
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        minWidth: 240,
        opacity: isMissing ? 0.65 : 1,
        outline: isMissing ? '1px dashed' : 'none',
        outlineColor: 'warning.main',
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
              title: name,
              sx: {
                fontWeight: 600,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                wordBreak: 'break-word',
                lineHeight: 1.25,
              },
            },
          }}
          sx={{
            padding: 1.25,
            paddingBottom: 0.5,
            '& .MuiCardHeader-content': { minWidth: 0 },
          }}
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
        {isMissing && (
          <Chip
            size="small"
            title={missingTitle}
            label="UNPUBLISHED"
            icon={<LinkOffIcon sx={{ fontSize: 14 }} />}
            variant="filled"
            color="warning"
            sx={{ fontSize: '0.7rem', fontWeight: 600 }}
          />
        )}
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
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 0.25,
          paddingX: 1.25,
          paddingY: 0.5,
          borderTop: '1px solid',
          borderColor: 'divider',
          fontSize: '0.65rem',
          color: 'text.secondary',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, minHeight: 18 }}>
          {hasRepository ? (
            <>
              {isGithubRepo ? (
                <GitHubIcon sx={{ fontSize: 12 }} />
              ) : (
                <CodeIcon sx={{ fontSize: 12 }} />
              )}
              <Typography
                component="a"
                href={repository}
                target="_blank"
                rel="noopener noreferrer"
                title={`Open source code: ${repository}`}
                onClick={openRepository}
                sx={{
                  fontSize: 'inherit',
                  color: 'text.secondary',
                  textDecoration: 'none',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  '&:hover': { color: 'primary.main', textDecoration: 'underline' },
                }}
              >
                {repositoryLabel}
              </Typography>
            </>
          ) : (
            <>
              <CodeOffIcon sx={{ fontSize: 12, color: 'text.disabled' }} />
              <Typography
                component="span"
                sx={{ fontSize: 'inherit', color: 'text.disabled', fontStyle: 'italic' }}
                title="No repository URL declared in package.json"
              >
                <Translate>Source code unavailable</Translate>
              </Typography>
            </>
          )}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, minHeight: 18 }}>
          {hasCves ? (
            <>
              <WarningAmberIcon
                sx={{
                  fontSize: 12,
                  color:
                    severityColor(vulnerabilities!.highest_severity) === 'error'
                      ? 'error.main'
                      : 'warning.main',
                }}
              />
              <Typography
                component="a"
                href={cveAdvisoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                title={cveTitle}
                onClick={(e) => {
                  e.stopPropagation();
                  if (cveAdvisoryUrl) {
                    window.open(cveAdvisoryUrl, '_blank', 'noopener,noreferrer');
                  }
                }}
                sx={{
                  fontSize: 'inherit',
                  color: 'text.secondary',
                  textDecoration: 'none',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  '&:hover': { color: 'primary.main', textDecoration: 'underline' },
                }}
              >
                {vulnerabilities!.ids[0]}
                {vulnerabilities!.count > 1 ? ` +${vulnerabilities!.count - 1} more` : ''}
              </Typography>
            </>
          ) : (
            <>
              <CheckCircleIcon sx={{ fontSize: 12, color: 'success.main' }} />
              <Typography
                component="span"
                sx={{ fontSize: 'inherit', color: 'text.secondary' }}
              >
                <Translate>No vulnerabilities found</Translate>
              </Typography>
            </>
          )}
        </Box>
      </Box>
    </Card>
  );
};

export default AddonCard;
