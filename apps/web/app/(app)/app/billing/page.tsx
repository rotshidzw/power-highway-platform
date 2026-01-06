import React from 'react';

export default function BillingPage() {
  return (
    <div>
      <h1>Invoices</h1>
      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Invoice</th>
              <th>Contract</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>INV-2026-01</td>
              <td>NC-GT-2025</td>
              <td>R 2,450,000</td>
              <td>Pending</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
