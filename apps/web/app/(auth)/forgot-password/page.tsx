import Link from 'next/link';
import React from 'react';

export default function ForgotPasswordPage() {
  return (
    <div className="card w-full max-w-md">
      <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Reset password</h1>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        We will send a reset link to your email.
      </p>
      <form className="mt-6 space-y-4">
        <div>
          <label className="text-sm font-medium text-slate-600 dark:text-slate-300" htmlFor="email">
            Email
          </label>
          <input
            className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm dark:border-slate-800 dark:bg-slate-900"
            id="email"
            type="email"
            placeholder="you@organization.co.za"
          />
        </div>
        <button className="btn btn-primary w-full" type="button">
          Send reset link
        </button>
      </form>
      <div className="mt-6 text-sm text-slate-500 dark:text-slate-400">
        <Link href="/login">Return to sign in</Link>
      </div>
    </div>
  );
}
