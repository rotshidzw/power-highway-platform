import React from 'react';

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 text-slate-100">
      <h1 className="text-3xl font-semibold">Contact</h1>
      <p className="mt-4 text-slate-300">
        Speak with the Power Highway team about regulatory access, partnerships, or investment.
      </p>
      <div className="card mt-8">
        <p className="text-sm text-slate-500 dark:text-slate-400">Email</p>
        <p className="text-lg font-semibold text-slate-900 dark:text-white">
          partnerships@powerhighway.co.za
        </p>
        <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">Phone</p>
        <p className="text-lg font-semibold text-slate-900 dark:text-white">+27 11 000 0000</p>
        <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">Address</p>
        <p className="text-lg font-semibold text-slate-900 dark:text-white">
          Sandton, Johannesburg, South Africa
        </p>
      </div>
    </div>
  );
}
