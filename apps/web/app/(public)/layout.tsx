import Link from 'next/link';
import React from 'react';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header className="container" style={{ padding: '24px 0' }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/">
            <strong>Power Highway</strong>
          </Link>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <Link href="/pricing">Pricing</Link>
            <Link href="/docs">Docs</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/login">Login</Link>
            <Link href="/app/dashboard" className="btn secondary">
              Go to App
            </Link>
          </div>
        </nav>
      </header>
      {children}
      <footer className="container" style={{ padding: '32px 0', borderTop: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <span>© 2026 Power Highway Platform</span>
          <div style={{ display: 'flex', gap: 16 }}>
            <Link href="/legal/terms">Terms</Link>
            <Link href="/legal/privacy">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
