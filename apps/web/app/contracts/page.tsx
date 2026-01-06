import React from 'react';

export default function ContractsPage() {
  return (
    <div>
      <h1>Wheeling Contracts</h1>
      <div className="panel">
        <table className="table">
          <thead>
            <tr>
              <th>Contract</th>
              <th>Producer</th>
              <th>Buyer</th>
              <th>Capacity (MW)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>NC-GT-2025</td>
              <td>Karoo Solar</td>
              <td>Gauteng Metro</td>
              <td>150</td>
              <td>Active</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
