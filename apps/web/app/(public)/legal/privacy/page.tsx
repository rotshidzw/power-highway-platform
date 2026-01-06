import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="container page-section">
      <h1>Privacy Policy</h1>
      <p>
        Power Highway only collects operational data necessary to support grid operations, wheeling
        contracts, and auditing.
      </p>
      <div className="card" style={{ marginTop: 24 }}>
        <p>We apply strict access controls based on user role and tenant.</p>
        <p>Data retention aligns with regulatory requirements.</p>
        <p>Contact privacy@powerhighway.co.za for information requests.</p>
      </div>
    </div>
  );
}
