import React from 'react';

export default function DocsPage() {
  return (
    <div className="container page-section">
      <h1>Documentation</h1>
      <p>Quick start guides and architecture references for the Power Highway Platform.</p>
      <div className="card-grid" style={{ marginTop: 24 }}>
        <div className="card">
          <h3>API Reference</h3>
          <p>REST endpoints, RBAC policies, and rate limit guidance.</p>
        </div>
        <div className="card">
          <h3>Ledger Integrity</h3>
          <p>Append-only ledger verification and audit workflows.</p>
        </div>
        <div className="card">
          <h3>Deployment</h3>
          <p>Infrastructure and observability for production operations.</p>
        </div>
      </div>
    </div>
  );
}
