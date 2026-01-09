import React from 'react';

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 text-slate-100">
      <h1 className="text-3xl font-semibold">Pricing</h1>
      <p className="mt-4 text-slate-300">Flexible pricing for national-scale transmission operators and investors.</p>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {[
          {
            title: 'Regulator Access',
            description: 'Read-only dashboards, audit exports, and compliance reporting.',
            price: 'Government Pricing',
          },
          {
            title: 'Grid Owners',
            description: 'Corridor modeling, tariff administration, and contract lifecycle tools.',
            price: 'From R 250k / month',
          },
          {
            title: 'Investor Suite',
            description: 'ROI analytics, utilization KPIs, and bankable performance reports.',
            price: 'From R 120k / month',
          },
        ].map((plan) => (
          <div key={plan.title} className="card">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{plan.title}</h3>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">{plan.description}</p>
            <p className="mt-6 text-sm font-semibold text-brand-500">{plan.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
