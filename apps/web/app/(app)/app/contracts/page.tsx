'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { Download, Plus } from 'lucide-react';
import { getMockData } from '@nph/mock-data';
import { exportToCsv } from '../../../../lib/csv';
import { formatDate, formatNumber } from '../../../../lib/format';

const mock = getMockData();

export default function ContractsPage() {
  const [status, setStatus] = useState('All');
  const [riskBand, setRiskBand] = useState('All');
  const [showModal, setShowModal] = useState(false);

  const filtered = useMemo(
    () =>
      mock.contracts.filter((contract) => {
        const statusMatch = status === 'All' || contract.status === status;
        const riskMatch =
          riskBand === 'All' ||
          (riskBand === 'High' && contract.riskScore >= 70) ||
          (riskBand === 'Medium' && contract.riskScore >= 40 && contract.riskScore < 70) ||
          (riskBand === 'Low' && contract.riskScore < 40);
        return statusMatch && riskMatch;
      }),
    [status, riskBand],
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Wheeling Contracts</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Manage commercial agreements, risk, and settlement cadence.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="btn btn-secondary" type="button" onClick={() => setShowModal(true)}>
            <Plus className="h-4 w-4" /> Create Contract
          </button>
          <button
            className="btn btn-primary"
            type="button"
            onClick={() =>
              exportToCsv(
                'contracts.csv',
                filtered.map((contract) => ({
                  id: contract.id,
                  counterparty: contract.counterparty,
                  corridor: contract.corridorName,
                  mw: contract.mw,
                  status: contract.status,
                  risk: contract.riskScore,
                })),
              )
            }
          >
            <Download className="h-4 w-4" /> Download CSV
          </button>
        </div>
      </div>

      <div className="card space-y-4">
        <div className="flex flex-wrap gap-3">
          <select
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-900"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            <option value="All">All status</option>
            <option value="Active">Active</option>
            <option value="Paused">Paused</option>
            <option value="At Risk">At Risk</option>
            <option value="Expired">Expired</option>
          </select>
          <select
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-900"
            value={riskBand}
            onChange={(event) => setRiskBand(event.target.value)}
          >
            <option value="All">All risk bands</option>
            <option value="High">High Risk</option>
            <option value="Medium">Medium Risk</option>
            <option value="Low">Low Risk</option>
          </select>
        </div>

        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead className="text-xs uppercase text-slate-400">
              <tr>
                <th className="pb-3 text-left">Contract ID</th>
                <th className="pb-3 text-left">Counterparty</th>
                <th className="pb-3 text-left">Corridor</th>
                <th className="pb-3 text-left">MW</th>
                <th className="pb-3 text-left">Start</th>
                <th className="pb-3 text-left">End</th>
                <th className="pb-3 text-left">Status</th>
                <th className="pb-3 text-left">Risk</th>
                <th className="pb-3 text-left">Tariff</th>
                <th className="pb-3 text-left">Last Settlement</th>
              </tr>
            </thead>
            <tbody>
              {filtered.slice(0, 120).map((contract) => (
                <tr key={contract.id} className="border-t border-slate-200/60 dark:border-slate-800">
                  <td className="py-3 font-medium">
                    <Link className="text-brand-500" href={`/app/contracts/${contract.id}`}>
                      {contract.id}
                    </Link>
                  </td>
                  <td className="py-3">{contract.counterparty}</td>
                  <td className="py-3">{contract.corridorName}</td>
                  <td className="py-3">{formatNumber(contract.mw)}</td>
                  <td className="py-3">{formatDate(contract.startDate)}</td>
                  <td className="py-3">{formatDate(contract.endDate)}</td>
                  <td className="py-3">
                    <span className="badge bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                      {contract.status}
                    </span>
                  </td>
                  <td className="py-3">{contract.riskScore}</td>
                  <td className="py-3">R {formatNumber(contract.tariff)}</td>
                  <td className="py-3">{formatDate(contract.lastSettlement)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-6">
          <div className="card w-full max-w-lg">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Create contract</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <input
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm dark:border-slate-800 dark:bg-slate-900"
                placeholder="Counterparty"
              />
              <input
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm dark:border-slate-800 dark:bg-slate-900"
                placeholder="Corridor"
              />
              <input
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm dark:border-slate-800 dark:bg-slate-900"
                placeholder="Contracted MW"
              />
              <input
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm dark:border-slate-800 dark:bg-slate-900"
                placeholder="Tariff"
              />
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button className="btn btn-secondary" type="button" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" type="button" onClick={() => setShowModal(false)}>
                Create contract
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
