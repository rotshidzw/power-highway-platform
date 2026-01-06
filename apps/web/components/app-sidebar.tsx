import Link from 'next/link';
import React from 'react';
import { routePermissions, hasAccess } from '../lib/permissions';
import type { UserRole } from '../lib/session';

type AppSidebarProps = {
  role: UserRole;
};

export const AppSidebar = ({ role }: AppSidebarProps) => (
  <aside className="app-sidebar">
    <h2>Power Highway</h2>
    {routePermissions.filter((route) => route.showInNav !== false).map((route) => {
      const allowed = hasAccess(role, route.path);
      if (allowed) {
        return (
          <Link key={route.path} className="sidebar-link" href={route.path}>
            {route.label}
          </Link>
        );
      }
      return (
        <div key={route.path} className="sidebar-link disabled">
          {route.label}
          <span>Locked</span>
        </div>
      );
    })}
  </aside>
);
