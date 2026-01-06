# Architecture Overview
The Power Highway Platform is a multi-service monorepo for national transmission infrastructure.

## Core Services
- **API**: NestJS REST API with RBAC, audit logging, and rate limiting.
- **Worker**: BullMQ jobs for billing, analytics, and ledger integrity checks.
- **Web**: Next.js App Router front-end for dashboards and operational workflows.

## Shared Packages
- **domain**: DDD entities, value objects, domain events.
- **db**: Prisma models, migrations, and seed data.
- **contracts**: Pricing and wheeling fee calculation engine.
- **ledger**: Append-only ledger utilities and integrity verification.
- **gis**: Spatial utilities and PostGIS helpers.
- **auth**: RBAC roles, permissions, and policy checks.
- **config**: Typed environment validation (zod).
- **observability**: Logging and metrics helpers.
- **api-client**: Typed API client for the web app.
- **ui**: Shared UI components.
