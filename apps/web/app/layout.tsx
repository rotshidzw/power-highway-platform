import './styles.css';
import React from 'react';
import { SideNav } from '../components/side-nav';

export const metadata = {
  title: 'Power Highway Platform',
  description: 'National transmission and wheeling platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="app-shell">
          <SideNav />
          <main className="content">{children}</main>
        </div>
      </body>
    </html>
  );
}
