import React from 'react';

export const Card: React.FC<React.PropsWithChildren<{ title: string }>> = ({ title, children }) => (
  <div style={{ border: '1px solid #E2E8F0', borderRadius: 12, padding: 16, background: '#fff' }}>
    <h3 style={{ marginBottom: 12 }}>{title}</h3>
    {children}
  </div>
);

export const Table: React.FC<{ headers: string[]; rows: string[][] }> = ({ headers, rows }) => (
  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
    <thead>
      <tr>
        {headers.map((header) => (
          <th key={header} style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #E2E8F0' }}>
            {header}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {rows.map((row, index) => (
        <tr key={index}>
          {row.map((cell) => (
            <td key={cell} style={{ padding: 8, borderBottom: '1px solid #F1F5F9' }}>
              {cell}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);
