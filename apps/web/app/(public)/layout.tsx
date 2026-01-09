import Link from 'next/link';
import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-slate-950 text-slate-100">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-lg font-semibold tracking-wide">
            Power Highway
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-slate-200 md:flex">
            <Link href="/pricing">Pricing</Link>
            <Link href="/docs">Docs</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/login">Login</Link>
          </nav>
          <Link href="/app/dashboard" className="btn btn-primary">
            View Platform <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </header>
      {children}
      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-8 text-sm text-slate-400">
          <span>© 2026 Power Highway Platform</span>
          <div className="flex items-center gap-6">
            <Link href="/legal/terms">Terms</Link>
            <Link href="/legal/privacy">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
