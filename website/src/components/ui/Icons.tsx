import React from 'react';

// Small icon set (24px grid, 2px stroke) replacing @mui/icons-material.
export type IconName =
  | 'shield'
  | 'database'
  | 'wrench'
  | 'filter'
  | 'hub'
  | 'route'
  | 'palette'
  | 'arrowDown'
  | 'checkCircle'
  | 'code'
  | 'codeOff'
  | 'github'
  | 'linkOff'
  | 'warning'
  | 'info'
  | 'external'
  | 'trophy'
  | 'merge'
  | 'star';

const PATHS: Record<IconName, React.ReactNode> = {
  shield: <path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6z" />,
  database: (
    <path d="M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3z M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6 M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
  ),
  wrench: (
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z" />
  ),
  filter: <path d="M3 4h18l-7 8v6l-4 2v-8z" />,
  hub: (
    <>
      <circle cx="12" cy="12" r="2" />
      <circle cx="12" cy="4.5" r="1.5" />
      <circle cx="5" cy="17.5" r="1.5" />
      <circle cx="19" cy="17.5" r="1.5" />
      <path d="M12 6v4 M10.3 13.2L6.2 16.4 M13.7 13.2l4.1 3.2" />
    </>
  ),
  route: (
    <>
      <circle cx="6" cy="18" r="2" />
      <circle cx="18" cy="6" r="2" />
      <path d="M6 16V9a3 3 0 0 1 3-3h7" />
    </>
  ),
  palette: (
    <path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.5-.9 1-1.7-.6-1 0-2.3 1.2-2.3H17a4 4 0 0 0 4-4C21 7 17 3 12 3z" />
  ),
  arrowDown: <path d="M12 5v14 M6 13l6 6 6-6" />,
  checkCircle: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.5l3 3 5-6" />
    </>
  ),
  code: <path d="M8 8l-4 4 4 4 M16 8l4 4-4 4" />,
  codeOff: <path d="M8 8l-4 4 4 4 M16 8l4 4-4 4 M3 3l18 18" />,
  github: (
    <path
      fill="currentColor"
      stroke="none"
      d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
    />
  ),
  linkOff: <path d="M10 13a5 5 0 0 0 7 0l2-2 M14 11a5 5 0 0 0-7 0l-2 2 M3 3l18 18" />,
  warning: <path d="M12 4l9 16H3z M12 10v4 M12 17.5v.01" />,
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5 M12 8v.01" />
    </>
  ),
  external: (
    <path d="M14 4h6v6 M20 4l-9 9 M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
  ),
  trophy: (
    <path d="M8 4h8v5a4 4 0 0 1-8 0z M8 6H4v1a3 3 0 0 0 4 3 M16 6h4v1a3 3 0 0 1-4 3 M12 13v4 M8 20h8 M10 17h4" />
  ),
  merge: (
    <>
      <circle cx="6" cy="6" r="2" />
      <circle cx="18" cy="18" r="2" />
      <path d="M6 8v4a6 6 0 0 0 6 6h4" />
    </>
  ),
  star: (
    <path
      fill="currentColor"
      d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.9L12 17.8 5.8 21.1 7 14.2 2 9.3l6.9-1z"
    />
  ),
};

type Props = { name: IconName; size?: number; title?: string; className?: string };

const Icon = ({ name, size = 18, title, className }: Props): React.ReactElement => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    role={title ? 'img' : undefined}
    aria-label={title}
    aria-hidden={title ? undefined : true}
  >
    {title && <title>{title}</title>}
    {PATHS[name]}
  </svg>
);

export default Icon;
