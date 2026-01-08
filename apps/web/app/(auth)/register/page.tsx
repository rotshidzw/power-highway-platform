'use client';

import Link from 'next/link';
import React, { useState } from 'react';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3001';

export default function RegisterPage() {
  const [orgName, setOrgName] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setStatus('submitting');
    try {
      const response = await fetch(`${apiBaseUrl}/v1/auth/request-access`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orgName, fullName, email, department }),
      });
      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.message ?? 'Unable to submit request.');
      }
      setStatus('success');
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Unable to submit request.');
      setStatus('error');
    }
  };

  return (
    <div className="card w-full max-w-md">
      <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Request Access</h1>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        Start onboarding your corridor portfolio and wheeling contracts.
      </p>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="text-sm font-medium text-slate-600 dark:text-slate-300" htmlFor="org">
            Organization
          </label>
          <input
            className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm dark:border-slate-800 dark:bg-slate-900"
            id="org"
            type="text"
            placeholder="Organization name"
            value={orgName}
            onChange={(event) => setOrgName(event.target.value)}
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-600 dark:text-slate-300" htmlFor="fullName">
            Full Name
          </label>
          <input
            className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm dark:border-slate-800 dark:bg-slate-900"
            id="fullName"
            type="text"
            placeholder="First and last name"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-600 dark:text-slate-300" htmlFor="email">
            Work Email
          </label>
          <input
            className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm dark:border-slate-800 dark:bg-slate-900"
            id="email"
            type="email"
            placeholder="you@organization.co.za"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-600 dark:text-slate-300" htmlFor="department">
            Department (optional)
          </label>
          <input
            className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm dark:border-slate-800 dark:bg-slate-900"
            id="department"
            type="text"
            placeholder="Compliance, Finance, Operations"
            value={department}
            onChange={(event) => setDepartment(event.target.value)}
          />
        </div>
        {status === 'success' ? (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
            Request submitted. Our team will review and approve your access shortly.
          </div>
        ) : (
          <>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button className="btn btn-primary w-full" type="submit" disabled={status === 'submitting'}>
              {status === 'submitting' ? 'Submitting...' : 'Submit request'}
            </button>
          </>
        )}
      </form>
      <div className="mt-6 text-sm text-slate-500 dark:text-slate-400">
        <Link href="/login">Already have access? Sign in</Link>
      </div>
    </div>
  );
}
