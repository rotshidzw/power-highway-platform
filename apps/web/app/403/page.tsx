import Link from 'next/link';
import React from 'react';

export default function ForbiddenPage() {
  return (
    <div className="container page-section">
      <h1>403 — Access denied</h1>
      <p>You do not have permission to access this area.</p>
      <Link href="/">Return home</Link>
    </div>
  );
}
