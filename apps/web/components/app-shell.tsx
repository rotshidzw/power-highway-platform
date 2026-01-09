'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import type { Session } from '../lib/session';
import { AppSidebar } from './app-sidebar';
import { AppTopbar } from './app-topbar';

type AppShellProps = {
  session: Session;
  children: React.ReactNode;
};

const formatBreadcrumbs = (pathname: string) =>
  pathname
    .split('/')
    .filter(Boolean)
    .slice(1)
    .map((segment) => segment.replace('-', ' '));

export const AppShell = ({ session, children }: AppShellProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const breadcrumbs = useMemo(() => formatBreadcrumbs(pathname ?? ''), [pathname]);

  useEffect(() => {
    if (window.innerWidth < 1024) {
      setCollapsed(true);
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <AppSidebar role={session.role} collapsed={collapsed} />
      <div className="flex flex-1 flex-col">
        <AppTopbar session={session} onToggleSidebar={() => setCollapsed((prev) => !prev)} />
        <div className="px-6 py-4">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Breadcrumbs</p>
          <div className="mt-2 flex flex-wrap gap-2 text-sm text-slate-500 dark:text-slate-400">
            {breadcrumbs.length === 0 ? (
              <span>Dashboard</span>
            ) : (
              breadcrumbs.map((crumb, index) => (
                <span key={`${crumb}-${index}`} className="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-900">
                  {crumb}
                </span>
              ))
            )}
          </div>
        </div>
        <main className="flex-1 px-6 pb-12">{children}</main>
      </div>
    </div>
  );
};
