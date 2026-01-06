import Link from 'next/link';
import React from 'react';

export default function RegisterPage() {
  return (
    <div className="auth-card">
      <h1>Request Access</h1>
      <p>Start onboarding your corridor portfolio and wheeling contracts.</p>
      <form style={{ marginTop: 24 }}>
        <div className="form-group">
          <label htmlFor="org">Organization</label>
          <input id="org" type="text" placeholder="Organization name" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Work Email</label>
          <input id="email" type="email" placeholder="you@organization.co.za" />
        </div>
        <button className="btn" type="button">
          Submit request
        </button>
      </form>
      <div style={{ marginTop: 16 }}>
        <Link href="/login">Already have access? Sign in</Link>
      </div>
    </div>
  );
}
