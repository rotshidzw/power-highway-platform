import React from 'react';
import type { Session } from '../lib/session';

type AppTopbarProps = {
  session: Session;
};

export const AppTopbar = ({ session }: AppTopbarProps) => (
  <div className="topbar">
    <div>
      <strong>Tenant:</strong>
      <span className="org-switch">Org {session.orgId}</span>
      <button className="btn secondary" style={{ marginLeft: 12 }}>
        Switch org
      </button>
    </div>
    <div>
      Role: <strong>{session.role}</strong>
    </div>
  </div>
);
