import React from 'react';

export default function TermsPage() {
  return (
    <div className="container page-section">
      <h1>Terms of Service</h1>
      <p>
        These terms govern the use of the Power Highway Platform for transmission planning, wheeling
        contracts, and regulatory reporting.
      </p>
      <div className="card" style={{ marginTop: 24 }}>
        <p>1. Platform access is granted under contractual agreement.</p>
        <p>2. Data integrity is monitored via append-only ledger controls.</p>
        <p>3. Regulatory users are provided read-only oversight access.</p>
      </div>
    </div>
  );
}
