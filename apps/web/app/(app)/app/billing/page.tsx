'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { Download, CheckCircle2 } from 'lucide-react';
import { getMockData } from '@nph/mock-data';
import { exportToCsv } from '../../../../lib/csv';
import { formatCurrency, formatDate } from '../../../../lib/format';

const mock = getMockData();

export default function BillingPage() {
  const [status, setStatus] = useState('All');

  const filtered = useMemo(
    () => mock.invoices.filter((invoice) => status === 'All' || invoice.status === status),
    [status],
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Billing & Invoices</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Track invoicing, settlements, and payment status across all contracts.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="btn btn-secondary" type="button">
            <CheckCircle2 className="h-4 w-4" /> Mark as paid
          </button>
          <button
            className="btn btn-primary"
            type="button"
            onClick={() =>
              exportToCsv(
                'invoices.csv',
                filtered.map((invoice) => ({
                  id: invoice.id,
                  org: invoice.org,
                  period: invoice.period,
                  amount: invoice.amount,
                  status: invoice.status,
                  dueDate: invoice.dueDate,
                })),
              )
            }
          >
            <Download className="h-4 w-4" /> Export CSV
          </button>
        </div>
      </div>

      <div className="card space-y-4">
        <div className="flex gap-3">
          <select
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-900"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            <option value="All">All statuses</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Overdue">Overdue</option>
          </select>
        </div>
        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead className="text-xs uppercase text-slate-400">
              <tr>
                <th className="pb-3 text-left">Invoice</th>
                <th className="pb-3 text-left">Org/Customer</th>
                <th className="pb-3 text-left">Period</th>
                <th className="pb-3 text-left">Amount</th>
                <th className="pb-3 text-left">Status</th>
                <th className="pb-3 text-left">Due Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.slice(0, 120).map((invoice) => (
                <tr key={invoice.id} className="border-t border-slate-200/60 dark:border-slate-800">
                  <td className="py-3 font-medium">
                    <Link className="text-brand-500" href={`/app/billing/invoices/${invoice.id}`}>
                      {invoice.id}
                    </Link>
                  </td>
                  <td className="py-3">{invoice.org}</td>
                  <td className="py-3">{invoice.period}</td>
                  <td className="py-3">{formatCurrency(invoice.amount)}</td>
                  <td className="py-3">
                    <span className="badge bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                      {invoice.status}
                    </span>
                  </td>
                  <td className="py-3">{formatDate(invoice.dueDate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
