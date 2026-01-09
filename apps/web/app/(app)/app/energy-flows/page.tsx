'use client';

import React, { useMemo, useState } from 'react';
import { UploadCloud } from 'lucide-react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { getMockData } from '@nph/mock-data';
import { formatDate, formatNumber } from '../../../../lib/format';

const mock = getMockData();

export default function EnergyFlowsPage() {
  const [search, setSearch] = useState('');
  const [quality, setQuality] = useState('All');
  const [showUpload, setShowUpload] = useState(false);
  const [imports, setImports] = useState(mock.imports);

  const filteredFlows = useMemo(
    () =>
      mock.flows.filter((flow) => {
        const matchQuality = quality === 'All' || flow.quality === quality;
        const matchSearch =
          search.length === 0 ||
          flow.corridorName.toLowerCase().includes(search.toLowerCase()) ||
          flow.meterPoint.toLowerCase().includes(search.toLowerCase());
        return matchQuality && matchSearch;
      }),
    [quality, search],
  );

  const trend = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, index) => ({
        day: `D${index + 1}`,
        flows: 400 + index * 22,
      })),
    [],
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Energy Flows</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Monitor metered flows, data quality, and ingestion performance.
          </p>
        </div>
        <button className="btn btn-primary" type="button" onClick={() => setShowUpload(true)}>
          <UploadCloud className="h-4 w-4" /> Upload CSV
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card lg:col-span-2">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Flow Trend</h2>
          <div className="mt-6 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trend}>
                <XAxis dataKey="day" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Area type="monotone" dataKey="flows" stroke="#14b8a6" fill="#99f6e4" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card space-y-4">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Data Quality</h2>
          <div className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
            <div className="flex items-center justify-between">
              <span>Anomaly count</span>
              <span className="font-semibold text-slate-900 dark:text-white">
                {mock.flows.filter((flow) => flow.anomaly).length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Data completeness</span>
              <span className="font-semibold text-slate-900 dark:text-white">96%</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Ingestion latency</span>
              <span className="font-semibold text-slate-900 dark:text-white">18 min</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card space-y-4">
        <div className="flex flex-wrap gap-3">
          <input
            className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-900"
            placeholder="Search corridor or meter point"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <select
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-900"
            value={quality}
            onChange={(event) => setQuality(event.target.value)}
          >
            <option value="All">All quality</option>
            <option value="Good">Good</option>
            <option value="Estimated">Estimated</option>
            <option value="Missing">Missing</option>
          </select>
        </div>
        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead className="text-xs uppercase text-slate-400">
              <tr>
                <th className="pb-3 text-left">Timestamp</th>
                <th className="pb-3 text-left">Corridor</th>
                <th className="pb-3 text-left">Meter Point</th>
                <th className="pb-3 text-left">MW</th>
                <th className="pb-3 text-left">MWh</th>
                <th className="pb-3 text-left">Quality</th>
                <th className="pb-3 text-left">Anomaly</th>
              </tr>
            </thead>
            <tbody>
              {filteredFlows.slice(0, 120).map((flow) => (
                <tr key={flow.id} className="border-t border-slate-200/60 dark:border-slate-800">
                  <td className="py-3">{formatDate(flow.timestamp)}</td>
                  <td className="py-3">{flow.corridorName}</td>
                  <td className="py-3">{flow.meterPoint}</td>
                  <td className="py-3">{formatNumber(flow.mw)}</td>
                  <td className="py-3">{formatNumber(flow.mwh)}</td>
                  <td className="py-3">
                    <span className="badge bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                      {flow.quality}
                    </span>
                  </td>
                  <td className="py-3">{flow.anomaly ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card space-y-4">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Imports</h2>
        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead className="text-xs uppercase text-slate-400">
              <tr>
                <th className="pb-3 text-left">File</th>
                <th className="pb-3 text-left">Source</th>
                <th className="pb-3 text-left">Rows</th>
                <th className="pb-3 text-left">Period</th>
                <th className="pb-3 text-left">Status</th>
                <th className="pb-3 text-left">Created</th>
              </tr>
            </thead>
            <tbody>
              {imports.slice(0, 12).map((job) => (
                <tr key={job.id} className="border-t border-slate-200/60 dark:border-slate-800">
                  <td className="py-3">{job.fileName}</td>
                  <td className="py-3">{job.source}</td>
                  <td className="py-3">{job.rows}</td>
                  <td className="py-3">{job.period}</td>
                  <td className="py-3">
                    <span className="badge bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                      {job.status}
                    </span>
                  </td>
                  <td className="py-3">{formatDate(job.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showUpload && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-6">
          <div className="card w-full max-w-md">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Upload flow CSV</h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Simulate ingesting a flow file into the ledger.
            </p>
            <div className="mt-4 space-y-3">
              <input
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm dark:border-slate-800 dark:bg-slate-900"
                placeholder="file-name.csv"
              />
              <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm dark:border-slate-800 dark:bg-slate-900">
                <option>SCADA</option>
                <option>Market Operator</option>
                <option>Metering Hub</option>
              </select>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button className="btn btn-secondary" type="button" onClick={() => setShowUpload(false)}>
                Cancel
              </button>
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => {
                  setImports((prev) => [
                    {
                      id: `${Date.now()}`,
                      fileName: 'manual-upload.csv',
                      source: 'SCADA',
                      rows: 18400,
                      period: '2026-01',
                      status: 'Processed',
                      createdAt: new Date().toISOString(),
                    },
                    ...prev,
                  ]);
                  setShowUpload(false);
                }}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
