import React from 'react';

export default function EnergyFlowsPage() {
  return (
    <div>
      <h1>Energy Flow Ledger</h1>
      <div className="panel">
        <table className="table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Producer</th>
              <th>Buyer</th>
              <th>Energy (kWh)</th>
              <th>Hash</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2025-01-14 12:00</td>
              <td>Karoo Solar</td>
              <td>Gauteng Metro</td>
              <td>12,500</td>
              <td>9f2a...e31</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
