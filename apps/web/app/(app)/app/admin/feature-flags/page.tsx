import React from 'react';

export default function FeatureFlagsPage() {
  return (
    <div>
      <h1>Feature Flags</h1>
      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Flag</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ledger-integrity</td>
              <td>Enabled</td>
            </tr>
            <tr>
              <td>simulations-beta</td>
              <td>Disabled</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
