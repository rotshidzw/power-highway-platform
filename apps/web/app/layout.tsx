import './globals.css';
import React from 'react';

export const metadata = {
  title: 'Power Highway Platform',
  description: 'National transmission and wheeling platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
