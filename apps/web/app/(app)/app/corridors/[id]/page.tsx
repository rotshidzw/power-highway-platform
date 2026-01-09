'use client';

import React, { useMemo } from 'react';
import { useParams } from 'next/navigation';
import { Area, AreaChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { getMockData } from '@nph/mock-data';
import { CorridorMap } from '../../../../../components/corridor-map';
import { formatDate, formatNumber } from '../../../../../lib/format';

const mock = getMockData();

export default function CorridorDetailPage() {
  const params = useParams();
  const corridor = mock.corridors.find((item) => item.id === params?.id) ?? mock.corridors[0];

  const flowSeries = useMemo(
    () =>
      Array.from({ length: 12 }).map((_, index) => ({
        month: `M${index + 1}`,
        flow: Math.round(corridor.currentFlowMw * (0.7 + index * 0.03)),
      })),
    [corridor],
  );

  const allocation = [
    { name: 'Contracted', value: corridor.utilization * 70 },
    { name: 'Reserved', value: corridor.utilization * 20 },
    { name: 'Open', value: 100 - corridor.utilization * 90 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">{corridor.name}</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Corridor performance summary and asset activity.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: 'Capacity MW', value: formatNumber(corridor.capacityMw) },
          { label: 'Current Flow MW', value: formatNumber(corridor.currentFlowMw) },
          { label: 'Utilization', value: `${formatNumber(corridor.utilization * 100)}%` },
          { label: 'Outages', value: '2 active' },
        ].map((card) => (
          <div key={card.label} className="card">
            <p className="card-title">{card.label}</p>
            <p className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card lg:col-span-2">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Flow Timeseries</h2>
          <div className="mt-6 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={flowSeries}>
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Area type="monotone" dataKey="flow" stroke="#2563eb" fill="#93c5fd" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Capacity Allocation</h2>
          <div className="mt-6 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={allocation} dataKey="value" innerRadius={50} outerRadius={80} fill="#1d4ed8" />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Assets</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-500 dark:text-slate-400">
            <div className="flex items-center justify-between rounded-xl border border-slate-200/60 px-4 py-3 dark:border-slate-800">
              <span>Transformer Station A</span>
              <span className="badge bg-emerald-500/10 text-emerald-500">Operational</span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-slate-200/60 px-4 py-3 dark:border-slate-800">
              <span>HV Line Segment 12</span>
              <span className="badge bg-amber-500/10 text-amber-500">Maintenance</span>
            </div>
          </div>
        </div>
        <div className="card">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Recent Events</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-500 dark:text-slate-400">
            {mock.auditLogs.slice(0, 4).map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between rounded-xl border border-slate-200/60 px-4 py-3 dark:border-slate-800"
              >
                <span>{event.event}</span>
                <span>{formatDate(event.timestamp)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Spatial View</h2>
        <div className="mt-4">
          <CorridorMap />
        </div>
      </div>
    </div>
  );
}
