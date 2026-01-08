'use client';

import React, { useMemo } from 'react';
import { useParams } from 'next/navigation';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { getMockData } from '@nph/mock-data';
import { formatCurrency, formatDate, formatNumber } from '../../../../../lib/format';

const mock = getMockData();

export default function ContractDetailPage() {
  const params = useParams();
  const contract = mock.contracts.find((item) => item.id === params?.id) ?? mock.contracts[0];

  const deliverySeries = useMemo(
    () =>
      Array.from({ length: 12 }).map((_, index) => ({
        month: `M${index + 1}`,
        delivered: Math.round(contract.mw * (0.75 + index * 0.02)),
        contracted: contract.mw,
      })),
    [contract],
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">{contract.id}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">{contract.counterparty}</p>
        </div>
        <div className="flex gap-3">
          <button className="btn btn-secondary">Download PDF</button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: 'Corridor', value: contract.corridorName },
          { label: 'Contracted MW', value: formatNumber(contract.mw) },
          { label: 'Tariff (R/kWh)', value: formatNumber(contract.tariff) },
          { label: 'Start Date', value: formatDate(contract.startDate) },
          { label: 'End Date', value: formatDate(contract.endDate) },
          { label: 'Risk Score', value: contract.riskScore },
        ].map((card) => (
          <div key={card.label} className="card">
            <p className="card-title">{card.label}</p>
            <p className="mt-3 text-lg font-semibold text-slate-900 dark:text-white">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Energy Delivered vs Contracted</h2>
        <div className="mt-6 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={deliverySeries}>
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Line type="monotone" dataKey="delivered" stroke="#2563eb" strokeWidth={3} />
              <Line type="monotone" dataKey="contracted" stroke="#94a3b8" strokeDasharray="4 4" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Billing Summary</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-500 dark:text-slate-400">
            <div className="flex items-center justify-between">
              <span>Year-to-date revenue</span>
              <span className="font-semibold text-slate-900 dark:text-white">{formatCurrency(12_600_000)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Outstanding balance</span>
              <span className="font-semibold text-slate-900 dark:text-white">{formatCurrency(2_450_000)}</span>
            </div>
          </div>
        </div>
        <div className="card">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Audit Trail</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-500 dark:text-slate-400">
            {mock.auditLogs.slice(0, 4).map((event) => (
              <div key={event.id} className="flex items-center justify-between">
                <span>{event.event}</span>
                <span>{formatDate(event.timestamp)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
