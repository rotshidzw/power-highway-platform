import React from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100">
      <div className="mx-auto flex max-w-5xl flex-col gap-12 md:flex-row md:items-center">
        <div className="flex-1 space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Secure Access</p>
          <h2 className="text-3xl font-semibold">Power Highway Operations Portal</h2>
          <p className="text-slate-300">
            Manage corridors, contracts, and revenue with enterprise-grade security and compliance.
          </p>
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
