import styles from './Ui.module.scss';

import clsx from 'clsx';
import React, { useEffect, useRef } from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
  title: React.ReactNode;
  titleId: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  wide?: boolean;
};

// Native <dialog>: focus trap, Escape to close and the backdrop come from the browser.
const Dialog = ({
  open,
  onClose,
  title,
  titleId,
  children,
  actions,
  wide,
}: Props): React.ReactElement => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className={clsx(styles.dialog, wide && styles.dialogWide)}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(e) => {
        // a click on the backdrop lands on the <dialog> element itself
        if (e.target === ref.current) onClose();
      }}
    >
      {open && (
        <div className={styles.dialogBody}>
          <header className={styles.dialogHead} id={titleId}>
            {title}
          </header>
          <div className={styles.dialogContent}>{children}</div>
          {actions && <footer className={styles.dialogActions}>{actions}</footer>}
        </div>
      )}
    </dialog>
  );
};

export default Dialog;
