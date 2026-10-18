import styles from './Home.module.scss';

import copy from 'copy-text-to-clipboard';
import React, { useEffect, useRef, useState } from 'react';

const CopyButton = ({ command }: { command: string }): React.ReactElement => {
  const [status, setStatus] = useState('Copy');
  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    setStatus('Copy');
    return () => clearTimeout(timeout.current);
  }, [command]);

  const onCopy = () => {
    clearTimeout(timeout.current);
    setStatus(copy(command) ? 'Copied' : 'Copy failed');
    timeout.current = setTimeout(() => setStatus('Copy'), 2000);
  };

  return (
    <button
      type="button"
      className={styles.copy}
      onClick={onCopy}
      aria-label={`Copy command: ${command}`}
    >
      <span role="status">{status}</span>
    </button>
  );
};

export default CopyButton;
