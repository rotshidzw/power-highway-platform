import React from 'react';

export default function PricingPage() {
  return (
    <div className="container page-section">
      <h1>Pricing</h1>
      <p>Flexible pricing for national-scale transmission operators and investors.</p>
      <div className="card-grid" style={{ marginTop: 32 }}>
        <div className="card">
          <h3>Regulator Access</h3>
          <p>Read-only dashboards, audit exports, and compliance reporting.</p>
          <strong>Custom Government Pricing</strong>
        </div>
        <div className="card">
          <h3>Grid Owners</h3>
          <p>Corridor modeling, tariff administration, and contract lifecycle tools.</p>
          <strong>From R 250k / month</strong>
        </div>
        <div className="card">
          <h3>Investor Suite</h3>
          <p>ROI analytics, utilization KPIs, and bankable performance reports.</p>
          <strong>From R 120k / month</strong>
        </div>
      </div>
    </div>
  );
}
