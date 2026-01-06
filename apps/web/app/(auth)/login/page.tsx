import Link from 'next/link';
import React from 'react';

export default function LoginPage() {
  return (
    <div className="auth-card">
      <h1>Sign in</h1>
      <p>Access the national transmission operations platform.</p>
      <form style={{ marginTop: 24 }}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" placeholder="you@organization.co.za" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" placeholder="••••••••" />
        </div>
        <button className="btn" type="button">
          Sign in
        </button>
      </form>
      <div style={{ marginTop: 16 }}>
        <Link href="/forgot-password">Forgot password?</Link>
      </div>
      <div style={{ marginTop: 8 }}>
        <Link href="/register">Need access? Register</Link>
      </div>
    </div>
  );
}
