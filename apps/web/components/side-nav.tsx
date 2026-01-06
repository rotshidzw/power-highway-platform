import Link from 'next/link';
import React from 'react';

export const SideNav = () => (
  <nav className="side-nav">
    <h2>Power Highway</h2>
    <Link href="/">Dashboard</Link>
    <Link href="/corridors">Corridors</Link>
    <Link href="/contracts">Contracts</Link>
    <Link href="/energy-flows">Energy Flows</Link>
    <Link href="/billing/invoices">Billing</Link>
    <Link href="/admin/users">Admin Users</Link>
    <Link href="/admin/audit">Audit Logs</Link>
    <Link href="/admin/feature-flags">Feature Flags</Link>
  </nav>
);
