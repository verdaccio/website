import React, { useState } from 'react';

import styles from './DataTable.module.scss';

interface DataTableProps {
  headers: string[];
  rows: (string | number)[][];
}

const DataTable: React.FC<DataTableProps> = ({ headers, rows }) => {
  const [open, setOpen] = useState(false);

  if (rows.length === 0) return null;

  return (
    <div className={styles.container}>
      <button className={styles.toggle} onClick={() => setOpen(!open)}>
        {open ? 'Hide data' : 'Show data'}
      </button>
      {open && (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                {headers.map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j}>{typeof cell === 'number' ? cell.toLocaleString() : cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DataTable;
