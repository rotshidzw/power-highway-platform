'use client';

import React, { useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { getMockData } from '@nph/mock-data';
import { formatCurrency, formatDate, formatNumber } from '../../../../../../lib/format';

const mock = getMockData();

export default function InvoiceDetailPage() {
  const params = useParams();
  const [status, setStatus] = useState('Pending');
  const invoice = mock.invoices.find((item) => item.id === params?.id) ?? mock.invoices[0];

  const timeline = useMemo(
    () => [
      { label: 'Issued', date: formatDate(invoice.dueDate) },
      { label: 'Reviewed', date: formatDate(invoice.dueDate) },
      { label: 'Approved', date: formatDate(invoice.dueDate) },
      { label: status, date: formatDate(invoice.dueDate) },
    ],
    [invoice.dueDate, status],
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Invoice {invoice.id}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">{invoice.org}</p>
        </div>
        <div className="flex gap-3">
          <button className="btn btn-secondary" type="button" onClick={() => setStatus('Paid')}>
            Mark as paid
          </button>
          <button className="btn btn-primary" type="button">
            Download Invoice PDF
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: 'Billing Period', value: invoice.period },
          { label: 'Amount', value: formatCurrency(invoice.amount) },
          { label: 'Status', value: status },
        ].map((card) => (
          <div key={card.label} className="card">
            <p className="card-title">{card.label}</p>
            <p className="mt-3 text-lg font-semibold text-slate-900 dark:text-white">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Line Items</h2>
        <div className="mt-4 overflow-auto">
          <table className="w-full text-sm">
            <thead className="text-xs uppercase text-slate-400">
              <tr>
                <th className="pb-3 text-left">Contract</th>
                <th className="pb-3 text-left">MWh</th>
                <th className="pb-3 text-left">Tariff</th>
                <th className="pb-3 text-left">Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoice.lineItems.map((item) => (
                <tr key={item.id} className="border-t border-slate-200/60 dark:border-slate-800">
                  <td className="py-3">{item.contractId}</td>
                  <td className="py-3">{formatNumber(item.mwh)}</td>
                  <td className="py-3">R {formatNumber(item.tariff)}</td>
                  <td className="py-3">{formatCurrency(item.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card space-y-3 text-sm text-slate-500 dark:text-slate-400">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Taxes & Fees</h2>
          <div className="flex items-center justify-between">
            <span>VAT (15%)</span>
            <span>{formatCurrency(invoice.amount * 0.15)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Settlement fee</span>
            <span>{formatCurrency(12000)}</span>
          </div>
        </div>
        <div className="card">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Status Timeline</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-500 dark:text-slate-400">
            {timeline.map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <span>{item.label}</span>
                <span>{item.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
