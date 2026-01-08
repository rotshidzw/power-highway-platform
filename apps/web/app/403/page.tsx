import Link from 'next/link';
import React from 'react';

export default function ForbiddenPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20 text-center">
      <h1 className="text-4xl font-semibold">403 — Access denied</h1>
      <p className="mt-4 text-slate-500 dark:text-slate-400">
        You do not have permission to access this area.
      </p>
      <Link className="btn btn-primary mt-8" href="/">
        Return home
      </Link>
    </div>
  );
}
