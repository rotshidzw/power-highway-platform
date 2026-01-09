'use client';

import React, { useMemo, useState } from 'react';
import { getMockData } from '@nph/mock-data';
import { formatDate } from '../../../../../lib/format';

const mock = getMockData();

export default function AuditLogPage() {
  const [severity, setSeverity] = useState('All');
  const [moduleFilter, setModuleFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = useMemo(
    () =>
      mock.auditLogs.filter((log) => {
        const severityMatch = severity === 'All' || log.severity === severity;
        const moduleMatch = moduleFilter === 'All' || log.module === moduleFilter;
        const searchMatch =
          search.length === 0 ||
          log.event.toLowerCase().includes(search.toLowerCase()) ||
          log.actor.toLowerCase().includes(search.toLowerCase());
        return severityMatch && moduleMatch && searchMatch;
      }),
    [severity, moduleFilter, search],
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Audit Logs</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Trace sensitive actions and compliance events across the platform.
        </p>
      </div>

      <div className="card space-y-4">
        <div className="flex flex-wrap gap-3">
          <input
            className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-900"
            placeholder="Search events or actors"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <select
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-900"
            value={severity}
            onChange={(event) => setSeverity(event.target.value)}
          >
            <option value="All">All severity</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <select
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-900"
            value={moduleFilter}
            onChange={(event) => setModuleFilter(event.target.value)}
          >
            <option value="All">All modules</option>
            {Array.from(new Set(mock.auditLogs.map((item) => item.module))).map((moduleName) => (
              <option key={moduleName} value={moduleName}>
                {moduleName}
              </option>
            ))}
          </select>
        </div>

        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead className="text-xs uppercase text-slate-400">
              <tr>
                <th className="pb-3 text-left">Event</th>
                <th className="pb-3 text-left">Severity</th>
                <th className="pb-3 text-left">Actor</th>
                <th className="pb-3 text-left">Timestamp</th>
                <th className="pb-3 text-left">Resource</th>
              </tr>
            </thead>
            <tbody>
              {filtered.slice(0, 80).map((log) => (
                <tr key={log.id} className="border-t border-slate-200/60 dark:border-slate-800">
                  <td className="py-3">
                    <div className="font-medium text-slate-900 dark:text-white">{log.event}</div>
                    <div className="text-xs text-slate-400">{log.module}</div>
                  </td>
                  <td className="py-3">
                    <span className="badge bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                      {log.severity}
                    </span>
                  </td>
                  <td className="py-3">{log.actor}</td>
                  <td className="py-3">{formatDate(log.timestamp)}</td>
                  <td className="py-3">{log.resource}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
