'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { getMockData } from '@nph/mock-data';
import { formatDate } from '../../../../../lib/format';

const mock = getMockData();

export default function AdminUsersPage() {
  const [showInvite, setShowInvite] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">User Administration</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Manage access and team permissions.</p>
        </div>
        <button className="btn btn-primary" type="button" onClick={() => setShowInvite(true)}>
          <Plus className="h-4 w-4" /> Invite user
        </button>
      </div>

      <div className="card overflow-auto">
        <table className="w-full text-sm">
          <thead className="text-xs uppercase text-slate-400">
            <tr>
              <th className="pb-3 text-left">User</th>
              <th className="pb-3 text-left">Role</th>
              <th className="pb-3 text-left">Status</th>
              <th className="pb-3 text-left">Last Login</th>
            </tr>
          </thead>
          <tbody>
            {mock.users.slice(0, 40).map((user) => (
              <tr key={user.id} className="border-t border-slate-200/60 dark:border-slate-800">
                <td className="py-3">
                  <div className="font-medium text-slate-900 dark:text-white">{user.name}</div>
                  <div className="text-xs text-slate-400">{user.email}</div>
                </td>
                <td className="py-3">{user.role}</td>
                <td className="py-3">
                  <span className="badge bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    {user.status}
                  </span>
                </td>
                <td className="py-3">{formatDate(user.lastLogin)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showInvite && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-6">
          <div className="card w-full max-w-md">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Invite user</h2>
            <div className="mt-4 space-y-3">
              <input
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm dark:border-slate-800 dark:bg-slate-900"
                placeholder="user@organization.co.za"
              />
              <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm dark:border-slate-800 dark:bg-slate-900">
                <option>ORG_ADMIN</option>
                <option>OPERATOR</option>
                <option>ANALYST</option>
                <option>WORKER</option>
              </select>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button className="btn btn-secondary" type="button" onClick={() => setShowInvite(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" type="button" onClick={() => setShowInvite(false)}>
                Send invite
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
