import React from 'react';
import { getSessionFromCookies } from '../../../lib/session';
import { AppShell } from '../../../components/app-shell';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = (await getSessionFromCookies()) ?? {
    userId: 'demo-user',
    role: 'SUPER_ADMIN',
    orgName: 'Power Highway',
  };

  return <AppShell session={session}>{children}</AppShell>;
}
