'use client';

import React from 'react';
import { Bell, ChevronDown, Search, ShieldCheck, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import type { Session } from '../lib/session';

type AppTopbarProps = {
  session: Session;
  onToggleSidebar: () => void;
};

export const AppTopbar = ({ session, onToggleSidebar }: AppTopbarProps) => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/60 bg-white px-6 py-4 dark:border-slate-800 dark:bg-slate-950">
      <div className="flex items-center gap-4">
        <button
          className="rounded-lg border border-slate-200 bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
          onClick={onToggleSidebar}
          type="button"
        >
          Menu
        </button>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Tenant</p>
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
            {session.orgName ?? 'Power Highway'}
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </div>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
          <ShieldCheck className="h-3.5 w-3.5" />
          Status: Healthy
        </span>
      </div>

      <div className="flex flex-1 items-center justify-end gap-4">
        <div className="hidden w-full max-w-md items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 md:flex">
          <Search className="h-4 w-4" />
          <input
            className="w-full bg-transparent outline-none"
            placeholder="Search corridors, contracts, invoices"
          />
        </div>
        <button
          className="rounded-full border border-slate-200 bg-slate-50 p-2 dark:border-slate-800 dark:bg-slate-900"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          type="button"
        >
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
        <button className="rounded-full border border-slate-200 bg-slate-50 p-2 dark:border-slate-800 dark:bg-slate-900">
          <Bell className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-brand-500 to-indigo-500" />
          <div className="hidden text-left md:block">
            <p className="text-xs text-slate-400">Signed in as</p>
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{session.role}</p>
          </div>
          <ChevronDown className="h-4 w-4 text-slate-400" />
        </div>
      </div>
    </div>
  );
};
