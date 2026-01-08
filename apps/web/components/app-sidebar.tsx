import Link from 'next/link';
import React from 'react';
import {
  Building2,
  ClipboardList,
  DatabaseZap,
  FileText,
  Flag,
  Gauge,
  ShieldCheck,
  Users,
  Activity,
} from 'lucide-react';
import { routePermissions, hasAccess, type NavGroup } from '../lib/permissions';
import type { UserRole } from '../lib/session';

const icons: Record<string, React.ReactNode> = {
  Dashboard: <Gauge className="h-4 w-4" />,
  Corridors: <Activity className="h-4 w-4" />,
  Contracts: <ClipboardList className="h-4 w-4" />,
  'Energy Flows': <DatabaseZap className="h-4 w-4" />,
  Billing: <FileText className="h-4 w-4" />,
  'Admin Users': <Users className="h-4 w-4" />,
  'Audit Logs': <ShieldCheck className="h-4 w-4" />,
  'Feature Flags': <Flag className="h-4 w-4" />,
};

type AppSidebarProps = {
  role: UserRole;
  collapsed: boolean;
};

const groupOrder: NavGroup[] = ['Overview', 'Operations', 'Commercial', 'Administration'];

export const AppSidebar = ({ role, collapsed }: AppSidebarProps) => {
  const groups = groupOrder.map((group) => ({
    group,
    items: routePermissions.filter(
      (route) => route.showInNav !== false && route.group === group,
    ),
  }));

  return (
    <aside
      className={`border-r border-slate-200/60 bg-white px-4 py-6 text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 ${
        collapsed ? 'w-20' : 'w-72'
      }`}
    >
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500 text-white">
          <Building2 className="h-5 w-5" />
        </div>
        {!collapsed && (
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Platform
            </p>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Power Highway</h2>
          </div>
        )}
      </div>

      <nav className="space-y-6">
        {groups.map((group) => (
          <div key={group.group}>
            {!collapsed && (
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                {group.group}
              </p>
            )}
            <div className="space-y-1">
              {group.items.map((route) => {
                const allowed = hasAccess(role, route.path);
                if (allowed) {
                  return (
                    <Link
                      key={route.path}
                      className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-900"
                      href={route.path}
                    >
                      {icons[route.label] ?? <Activity className="h-4 w-4" />}
                      {!collapsed && route.label}
                    </Link>
                  );
                }
                return (
                  <div
                    key={route.path}
                    className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-slate-400"
                  >
                    {icons[route.label] ?? <Activity className="h-4 w-4" />}
                    {!collapsed && (
                      <span className="flex items-center gap-2">
                        {route.label}
                        <span className="badge bg-slate-200 text-slate-500 dark:bg-slate-800">
                          Locked
                        </span>
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
      {!collapsed && (
        <div className="mt-10 rounded-2xl border border-dashed border-slate-300 p-4 text-xs text-slate-500 dark:border-slate-700">
          <p className="font-semibold text-slate-700 dark:text-slate-200">Help & Support</p>
          <p className="mt-2">Access training, API guides, and service status.</p>
          <Link className="mt-3 inline-flex text-brand-500" href="/docs">
            Open Help Center
          </Link>
        </div>
      )}
    </aside>
  );
};
