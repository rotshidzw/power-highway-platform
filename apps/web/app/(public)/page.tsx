import Link from 'next/link';
import React from 'react';

export default function HomePage() {
  return (
    <div>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <h1>National Transmission Infrastructure, Delivered as a Platform.</h1>
            <p>
              Power Highway is South Africa&apos;s neutral, independent transmission platform for private
              grid ownership, wheeling contracts, and investor-grade analytics.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
              <Link href="/register" className="btn">
                Request Access
              </Link>
              <Link href="/docs" className="btn secondary">
                View Docs
              </Link>
            </div>
          </div>
          <div className="card">
            <h3>Live Corridor Intelligence</h3>
            <p>Track capacity, congestion, and utilization across strategic corridors.</p>
            <ul>
              <li>Bankable audit trails</li>
              <li>Automated wheeling invoices</li>
              <li>Regulatory oversight dashboards</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="page-section container">
        <h2>Platform Modules</h2>
        <div className="card-grid">
          <div className="card">
            <h3>Grid Mapping Engine</h3>
            <p>GIS corridors, line attributes, and congestion visualization in one view.</p>
          </div>
          <div className="card">
            <h3>Wheeling Contracts</h3>
            <p>Digitize 20-25 year agreements and enforce tariff logic per corridor.</p>
          </div>
          <div className="card">
            <h3>Energy Flow Ledger</h3>
            <p>Append-only ledger for producer-to-buyer flows with integrity checks.</p>
          </div>
          <div className="card">
            <h3>Investor Analytics</h3>
            <p>ROI, utilization, and revenue dashboards for financing decisions.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
