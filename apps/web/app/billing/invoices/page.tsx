import React from 'react';

export default function InvoicesPage() {
  return (
    <div>
      <h1>Invoices</h1>
      <div className="panel">
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
              <td>INV-2025-01</td>
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
