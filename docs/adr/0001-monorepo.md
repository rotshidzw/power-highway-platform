# ADR 0001: Monorepo with pnpm + Turborepo

## Status
Accepted

## Context
The platform must scale across multiple teams and services with shared packages.

## Decision
Adopt a pnpm workspace monorepo with Turborepo for task orchestration.

## Consequences
- Shared code is versioned and built together.
- Consistent tooling for linting, typecheck, and tests.
