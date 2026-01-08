'use client';

import React, { useState } from 'react';
import { getMockData } from '@nph/mock-data';
import { formatDate } from '../../../../../lib/format';

const mock = getMockData();

export default function FeatureFlagsPage() {
  const [environment, setEnvironment] = useState('All');
  const [flagsState, setFlagsState] = useState(mock.featureFlags);

  const flags = flagsState.filter((flag) => environment === 'All' || flag.environment === environment);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Feature Flags</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Manage controlled rollouts across tenant environments.
        </p>
      </div>

      <div className="card space-y-4">
        <div className="flex flex-wrap gap-3">
          <select
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-900"
            value={environment}
            onChange={(event) => setEnvironment(event.target.value)}
          >
            <option value="All">All environments</option>
            <option value="Dev">Dev</option>
            <option value="Staging">Staging</option>
            <option value="Prod">Prod</option>
          </select>
        </div>
        <div className="space-y-3">
          {flags.map((flag) => (
            <div
              key={flag.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200/60 px-4 py-3 text-sm dark:border-slate-800"
            >
              <div>
                <div className="font-medium text-slate-900 dark:text-white">{flag.key}</div>
                <div className="text-xs text-slate-400">{flag.description}</div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400">{flag.environment}</span>
                <button
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    flag.enabled ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-200 text-slate-600 dark:bg-slate-800'
                  }`}
                  type="button"
                  onClick={() =>
                    setFlagsState((prev) =>
                      prev.map((item) =>
                        item.id === flag.id ? { ...item, enabled: !item.enabled } : item,
                      ),
                    )
                  }
                >
                  {flag.enabled ? 'Enabled' : 'Disabled'}
                </button>
                <span className="text-xs text-slate-400">{formatDate(flag.updatedAt)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Change History</h2>
        <div className="mt-4 space-y-3 text-sm text-slate-500 dark:text-slate-400">
          {mock.auditLogs.slice(0, 5).map((event) => (
            <div key={event.id} className="flex items-center justify-between">
              <span>{event.event}</span>
              <span>{formatDate(event.timestamp)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
