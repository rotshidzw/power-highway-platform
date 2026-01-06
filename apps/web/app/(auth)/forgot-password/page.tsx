import Link from 'next/link';
import React from 'react';

export default function ForgotPasswordPage() {
  return (
    <div className="auth-card">
      <h1>Reset password</h1>
      <p>We will send a reset link to your email.</p>
      <form style={{ marginTop: 24 }}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" placeholder="you@organization.co.za" />
        </div>
        <button className="btn" type="button">
          Send reset link
        </button>
      </form>
      <div style={{ marginTop: 16 }}>
        <Link href="/login">Return to sign in</Link>
      </div>
    </div>
  );
}
