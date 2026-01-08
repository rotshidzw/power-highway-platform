/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useMemo, useState } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { AlertTriangle, ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { getMockData } from '@nph/mock-data';
import { formatCurrency, formatNumber } from '../../../../lib/format';
import { Skeleton } from '../../../../components/skeleton';

const mock = getMockData();

const baseSeries = Array.from({ length: 12 }).map((_, index) => ({
  month: `M${index + 1}`,
  utilization: 55 + index * 2,
  revenue: 20 + index * 3,
}));

const statusMix = [
  { name: 'Active', value: 62 },
  { name: 'Paused', value: 18 },
  { name: 'At Risk', value: 12 },
  { name: 'Expired', value: 8 },
];

const chartColors = ['#2563eb', '#0ea5e9', '#f97316', '#ef4444'];

export default function DashboardPage() {
  const [range, setRange] = useState('30');
  const [region, setRegion] = useState('All');
  const [corridor, setCorridor] = useState('All');

  const corridors = mock.corridors;
  const contracts = mock.contracts;
  const invoices = mock.invoices;

  const filteredCorridors = useMemo(() => {
    return corridors.filter((item) => {
      const regionMatch = region === 'All' || item.region === region;
      const corridorMatch = corridor === 'All' || item.name === corridor;
      return regionMatch && corridorMatch;
    });
  }, [corridors, region, corridor]);

  const totalCapacity = filteredCorridors.reduce((sum, item) => sum + item.capacityMw, 0);
  const totalFlow = filteredCorridors.reduce((sum, item) => sum + item.currentFlowMw, 0);

  const summaryCards = [
    { label: 'Available Capacity (MW)', value: formatNumber(totalCapacity), trend: '+6.2%' },
    { label: 'Utilization %', value: `${formatNumber((totalFlow / totalCapacity) * 100)}%`, trend: '+1.4%' },
    { label: 'Active Contracts', value: contracts.filter((c) => c.status === 'Active').length, trend: '+4.1%' },
    { label: 'Contracts At Risk', value: contracts.filter((c) => c.status === 'At Risk').length, trend: '-2.1%' },
    { label: 'Forecasted Revenue (Monthly)', value: formatCurrency(58_400_000), trend: '+3.8%' },
    { label: 'Revenue Collected (MTD)', value: formatCurrency(42_150_000), trend: '+5.9%' },
    { label: 'Average Congestion', value: '0.62', trend: '-1.2%' },
    { label: 'Meter Data Freshness', value: '1.8 hrs', trend: '+0.6%' },
  ];

  const timeSeries = useMemo(() => {
    if (range === '7') {
      return baseSeries.slice(0, 7);
    }
    if (range === '30') {
      return baseSeries.slice(0, 10);
    }
    return baseSeries;
  }, [range]);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">Operational Command Center</h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Live view of corridor performance, contract health, and revenue execution.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <select
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-900"
            value={range}
            onChange={(event) => setRange(event.target.value)}
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
          </select>
          <select
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-900"
            value={region}
            onChange={(event) => setRegion(event.target.value)}
          >
            <option value="All">All regions</option>
            {Array.from(new Set(corridors.map((item) => item.region))).map((regionName) => (
              <option key={regionName} value={regionName}>
                {regionName}
              </option>
            ))}
          </select>
          <select
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-900"
            value={corridor}
            onChange={(event) => setCorridor(event.target.value)}
          >
            <option value="All">All corridors</option>
            {corridors.slice(0, 8).map((item) => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => (
          <div key={card.label} className="card">
            <p className="card-title">{card.label}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-2xl font-semibold text-slate-900 dark:text-white">{card.value}</span>
              <span className="flex items-center gap-1 text-xs text-emerald-400">
                {card.trend.startsWith('-') ? <ArrowDownRight className="h-3 w-3" /> : <ArrowUpRight className="h-3 w-3" />}
                {card.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Utilization Over Time</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Transmission utilization trend</p>
            </div>
          </div>
          <div className="mt-6 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timeSeries}>
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Line type="monotone" dataKey="utilization" stroke="#2563eb" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Contract Status Mix</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Risk distribution by status</p>
          <div className="mt-6 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusMix} dataKey="value" innerRadius={60} outerRadius={90}>
                  {statusMix.map((entry, index) => (
                    <Cell key={entry.name} fill={chartColors[index % chartColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Capacity vs Flow</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Top corridors by volume</p>
          <div className="mt-6 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={filteredCorridors.slice(0, 6)}>
                <XAxis dataKey="name" hide />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Bar dataKey="capacityMw" stackId="a" fill="#1d4ed8" />
                <Bar dataKey="currentFlowMw" stackId="a" fill="#38bdf8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Revenue Trend</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Monthly wheeling collections</p>
          <div className="mt-6 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timeSeries}>
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#14b8a6" fill="#99f6e4" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Top Corridors by Utilization</h2>
          <div className="mt-6 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={filteredCorridors.slice(0, 8)}>
                <XAxis dataKey="name" hide />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Bar dataKey="utilization" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card space-y-4">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Insights</h2>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm dark:border-slate-800 dark:bg-slate-900">
            <p className="font-semibold text-slate-900 dark:text-white">Top Constraint Corridor</p>
            <p className="mt-1 text-slate-500 dark:text-slate-400">Eastern Cape → Mpumalanga (82% utilization)</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm dark:border-slate-800 dark:bg-slate-900">
            <p className="font-semibold text-slate-900 dark:text-white">Highest Risk Contract</p>
            <p className="mt-1 text-slate-500 dark:text-slate-400">CTR-45211 • Risk score 89</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm dark:border-slate-800 dark:bg-slate-900">
            <p className="font-semibold text-slate-900 dark:text-white">Billing Exceptions</p>
            <p className="mt-1 text-slate-500 dark:text-slate-400">3 invoices awaiting approval</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Recent Contracts</h2>
            <button className="btn btn-secondary">Export CSV</button>
          </div>
          <div className="mt-4 overflow-auto">
            <table className="w-full text-sm">
              <thead className="text-xs uppercase text-slate-400">
                <tr>
                  <th className="pb-3 text-left">Contract</th>
                  <th className="pb-3 text-left">Counterparty</th>
                  <th className="pb-3 text-left">Status</th>
                  <th className="pb-3 text-left">Risk</th>
                </tr>
              </thead>
              <tbody>
                {contracts.slice(0, 6).map((contract) => (
                  <tr key={contract.id} className="border-t border-slate-200/60 dark:border-slate-800">
                    <td className="py-3 font-medium">{contract.id}</td>
                    <td className="py-3">{contract.counterparty}</td>
                    <td className="py-3">
                      <span className="badge bg-emerald-500/10 text-emerald-500">{contract.status}</span>
                    </td>
                    <td className="py-3">{contract.riskScore}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Recent Alerts</h2>
            <button className="btn btn-secondary">View all</button>
          </div>
          <div className="mt-4 space-y-3">
            {mock.auditLogs.slice(0, 6).map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between rounded-xl border border-slate-200/60 bg-slate-50 px-4 py-3 text-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-4 w-4 text-amber-400" />
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">{event.module}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{event.event}</p>
                  </div>
                </div>
                <span className="badge bg-amber-500/10 text-amber-500">{event.severity}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Live Data Refresh</h2>
          <span className="text-xs text-slate-400">Refreshing in 3 minutes</span>
        </div>
        <div className="mt-4 space-y-3">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    </div>
  );
}
