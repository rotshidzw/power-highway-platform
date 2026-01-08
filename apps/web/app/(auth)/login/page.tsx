'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3001';

const demoAccounts = [
  { label: 'Power Highway Admin', email: 'admin@powerhighway.co.za' },
  { label: 'GridWorks Operator', email: 'ops@gridworks.co.za' },
  { label: 'Regulator Analyst', email: 'analyst@regulator.gov.za' },
];

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const nextPath = searchParams.get('next') ?? '/app/dashboard';

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const response = await fetch(`${apiBaseUrl}/v1/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.message ?? 'Unable to sign in.');
      }
      router.replace(nextPath);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Unable to sign in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card w-full max-w-md">
      <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Sign in</h1>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        Access the national transmission operations platform.
      </p>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="text-sm font-medium text-slate-600 dark:text-slate-300" htmlFor="email">
            Email
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
          <label className="text-sm font-medium text-slate-600 dark:text-slate-300" htmlFor="password">
            Password
          </label>
          <input
            className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm dark:border-slate-800 dark:bg-slate-900"
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button className="btn btn-primary w-full" type="submit" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>

      <div className="mt-6 space-y-2 rounded-xl border border-dashed border-slate-200 p-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
        <p className="font-semibold text-slate-600 dark:text-slate-300">Demo accounts (password: password123)</p>
        <ul className="space-y-1">
          {demoAccounts.map((account) => (
            <li key={account.email}>
              <span className="font-medium text-slate-700 dark:text-slate-200">{account.label}</span>
              <span className="ml-2 text-slate-400">{account.email}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex flex-col gap-2 text-sm text-slate-500 dark:text-slate-400">
        <Link href="/forgot-password">Forgot password?</Link>
        <Link href="/register">Need access? Register</Link>
      </div>
    </div>
  );
}
