import React from 'react';
import { getSessionFromCookies } from '../../../lib/session';
import { AppShell } from '../../../components/app-shell';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const session = getSessionFromCookies() ?? {
    userId: 'demo-user',
    role: 'SUPER_ADMIN',
    orgId: 'NPH',
  };

  return <AppShell session={session}>{children}</AppShell>;
}
