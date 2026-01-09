import './globals.css';
import React from 'react';
import { ThemeProvider } from '../components/theme-provider';

export const metadata = {
  title: 'Power Highway Platform',
  description: 'National transmission and wheeling platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
