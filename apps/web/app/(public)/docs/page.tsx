import React from 'react';

export default function DocsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 text-slate-100">
      <h1 className="text-3xl font-semibold">Documentation</h1>
      <p className="mt-4 text-slate-300">Quick start guides and architecture references for the platform.</p>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {[
          { title: 'API Reference', description: 'REST endpoints, RBAC policies, and rate limits.' },
          { title: 'Ledger Integrity', description: 'Append-only ledger verification and audit workflows.' },
          { title: 'Deployment', description: 'Infrastructure and observability for production operations.' },
        ].map((item) => (
          <div key={item.title} className="card">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{item.title}</h3>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
