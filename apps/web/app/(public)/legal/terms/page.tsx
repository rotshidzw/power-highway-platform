import React from 'react';

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 text-slate-100">
      <h1 className="text-3xl font-semibold">Terms of Service</h1>
      <p className="mt-4 text-slate-300">
        These terms govern the use of the Power Highway Platform for transmission planning, wheeling
        contracts, and regulatory reporting.
      </p>
      <div className="card mt-8 space-y-3 text-sm text-slate-500 dark:text-slate-400">
        <p>1. Platform access is granted under contractual agreement.</p>
        <p>2. Data integrity is monitored via append-only ledger controls.</p>
        <p>3. Regulatory users are provided read-only oversight access.</p>
      </div>
    </div>
  );
}
