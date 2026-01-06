import React from 'react';

export default function AuditLogPage() {
  return (
    <div>
      <h1>Audit Log</h1>
      <div className="panel">
        <table className="table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Actor</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2025-01-14 11:10</td>
              <td>admin@nph.co.za</td>
              <td>corridor.create</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
