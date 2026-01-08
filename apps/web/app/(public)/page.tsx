import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="bg-slate-950 text-slate-100">
      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-sm uppercase tracking-[0.4em] text-slate-400">National Infrastructure OS</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
            Transmission-as-a-Service for South Africa&apos;s power highways.
          </h1>
          <p className="mt-6 text-lg text-slate-300">
            Power Highway unifies corridor planning, wheeling contracts, and energy flow governance in a
            bankable, audit-ready platform.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/register" className="btn btn-primary">
              Request Demo <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/docs" className="btn btn-secondary">
              View Platform Docs
            </Link>
          </div>
          <div className="mt-10 grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-300">
            <div className="flex items-start gap-4">
              <span className="badge bg-emerald-500/20 text-emerald-200">Secure Ledger</span>
              <div>
                <p className="font-semibold text-white">Immutable energy flow records</p>
                <p>Audit trails designed for regulators, lenders, and insurers.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="badge bg-blue-500/20 text-blue-200">Investor Ready</span>
              <div>
                <p className="font-semibold text-white">ROI analytics & cashflow projections</p>
                <p>Drive bankable decisions for private transmission investment.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4">
          <Image
            src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80"
            alt="Transmission lines at sunrise"
            width={1200}
            height={800}
            className="rounded-2xl object-cover"
          />
          <div className="absolute bottom-6 left-6 rounded-2xl bg-slate-900/80 p-4 text-sm text-slate-200">
            Real-time corridor telemetry, capacity and congestion analytics.
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="card">
            <p className="card-title">How it works</p>
            <h3 className="mt-3 text-xl font-semibold text-slate-900 dark:text-white">Corridor Intelligence</h3>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
              GIS-enabled corridor mapping, congestion forecasting, and asset performance tracking.
            </p>
          </div>
          <div className="card">
            <p className="card-title">Operational Control</p>
            <h3 className="mt-3 text-xl font-semibold text-slate-900 dark:text-white">Wheeling Contracts</h3>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
              Digital contract registry with tariff logic, settlement automation, and compliance workflows.
            </p>
          </div>
          <div className="card">
            <p className="card-title">Security & Compliance</p>
            <h3 className="mt-3 text-xl font-semibold text-slate-900 dark:text-white">Ledger Integrity</h3>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
              Immutable flow logs and investor-grade reporting for regulators and lenders.
            </p>
          </div>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6">
            <Image
              src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80"
              alt="Operations control room"
              width={1200}
              height={800}
              className="rounded-2xl object-cover"
            />
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6">
            <Image
              src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?auto=format&fit=crop&w=1200&q=80"
              alt="Grid infrastructure"
              width={1200}
              height={800}
              className="rounded-2xl object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
