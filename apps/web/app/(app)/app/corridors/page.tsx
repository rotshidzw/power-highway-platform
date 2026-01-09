'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { Plus, Download } from 'lucide-react';
import { getMockData } from '@nph/mock-data';
import { CorridorMap } from '../../../../components/corridor-map';
import { exportToCsv } from '../../../../lib/csv';
import { formatDate, formatNumber } from '../../../../lib/format';

const mock = getMockData();

export default function CorridorsPage() {
  const [region, setRegion] = useState('All');
  const [status, setStatus] = useState('All');
  const [utilization, setUtilization] = useState('All');
  const [localData, setLocalData] = useState(mock.corridors);
  const [showModal, setShowModal] = useState(false);

  const filtered = useMemo(() => {
    return localData.filter((item) => {
      const regionMatch = region === 'All' || item.region === region;
      const statusMatch = status === 'All' || item.status === status;
      const utilizationMatch =
        utilization === 'All' ||
        (utilization === 'High' && item.utilization >= 0.75) ||
        (utilization === 'Medium' && item.utilization >= 0.5 && item.utilization < 0.75) ||
        (utilization === 'Low' && item.utilization < 0.5);
      return regionMatch && statusMatch && utilizationMatch;
    });
  }, [localData, region, status, utilization]);

  const handleAdd = () => {
    const next = {
      ...localData[0],
      id: `new-${Date.now()}`,
      name: 'New Corridor → Gauteng',
      status: 'Planned' as const,
    };
    setLocalData([next, ...localData]);
    setShowModal(false);
  };

  return (
    <>
      <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Grid Corridors</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Monitor capacity, flow, and utilization across national corridors.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="btn btn-secondary" onClick={() => setShowModal(true)} type="button">
            <Plus className="h-4 w-4" /> Add Corridor
          </button>
          <button
            className="btn btn-primary"
            type="button"
            onClick={() =>
              exportToCsv(
                'corridors.csv',
                filtered.map((item) => ({
                  name: item.name,
                  region: item.region,
                  voltageKv: item.voltageKv,
                  capacityMw: item.capacityMw,
                  flowMw: item.currentFlowMw,
                  utilization: item.utilization,
                  status: item.status,
                  updatedAt: item.updatedAt,
                })),
              )
            }
          >
            <Download className="h-4 w-4" /> Export CSV
          </button>
        </div>
      </div>

      <div className="card">
        <CorridorMap />
      </div>

      <div className="card space-y-4">
        <div className="flex flex-wrap gap-3">
          <select
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-900"
            value={region}
            onChange={(event) => setRegion(event.target.value)}
          >
            <option value="All">All regions</option>
            {Array.from(new Set(localData.map((item) => item.region))).map((regionName) => (
              <option key={regionName} value={regionName}>
                {regionName}
              </option>
            ))}
          </select>
          <select
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-900"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            <option value="All">All statuses</option>
            <option value="Active">Active</option>
            <option value="Planned">Planned</option>
            <option value="Congested">Congested</option>
            <option value="Maintenance">Maintenance</option>
          </select>
          <select
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-900"
            value={utilization}
            onChange={(event) => setUtilization(event.target.value)}
          >
            <option value="All">All utilization</option>
            <option value="High">High (&gt; 75%)</option>
            <option value="Medium">Medium (50-75%)</option>
            <option value="Low">Low (&lt; 50%)</option>
          </select>
        </div>
        <div className="overflow-auto">
          {filtered.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
              No corridors match the selected filters.
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="text-xs uppercase text-slate-400">
                <tr>
                  <th className="pb-3 text-left">Corridor</th>
                  <th className="pb-3 text-left">Region</th>
                  <th className="pb-3 text-left">Voltage</th>
                  <th className="pb-3 text-left">Capacity MW</th>
                  <th className="pb-3 text-left">Flow MW</th>
                  <th className="pb-3 text-left">Utilization</th>
                  <th className="pb-3 text-left">Status</th>
                  <th className="pb-3 text-left">Updated</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr key={item.id} className="border-t border-slate-200/60 dark:border-slate-800">
                    <td className="py-3 font-medium">
                      <Link className="text-brand-500" href={`/app/corridors/${item.id}`}>
                        {item.name}
                      </Link>
                    </td>
                    <td className="py-3">{item.region}</td>
                    <td className="py-3">{item.voltageKv} kV</td>
                    <td className="py-3">{formatNumber(item.capacityMw)}</td>
                    <td className="py-3">{formatNumber(item.currentFlowMw)}</td>
                    <td className="py-3">{formatNumber(item.utilization * 100)}%</td>
                    <td className="py-3">
                      <span className="badge bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3">{formatDate(item.updatedAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-6">
          <div className="card w-full max-w-lg">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Add corridor</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <input
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm dark:border-slate-800 dark:bg-slate-900"
                placeholder="Corridor name"
              />
              <input
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm dark:border-slate-800 dark:bg-slate-900"
                placeholder="Region"
              />
              <input
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm dark:border-slate-800 dark:bg-slate-900"
                placeholder="Voltage (kV)"
              />
              <input
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm dark:border-slate-800 dark:bg-slate-900"
                placeholder="Capacity (MW)"
              />
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button className="btn btn-secondary" type="button" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" type="button" onClick={handleAdd}>
                Add corridor
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
