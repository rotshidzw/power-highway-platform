import React from 'react';
import { getSessionFromCookies } from '../../../lib/session';
import { AppSidebar } from '../../../components/app-sidebar';
import { AppTopbar } from '../../../components/app-topbar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const session = getSessionFromCookies() ?? {
    userId: 'demo-user',
    role: 'SUPER_ADMIN',
    orgId: 'NPH',
  };

  return (
    <div className="app-shell">
      <AppSidebar role={session.role} />
      <div className="app-content">
        <AppTopbar session={session} />
        <div className="content-area">{children}</div>
      </div>
    </div>
  );
}
