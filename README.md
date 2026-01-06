# Power Highway Platform
National Independent Transmission Grid Platform for South Africa.

## Development (Docker-first, no local node_modules required)
1. Install prerequisites:
   - Docker Desktop
   - Node.js 20+ only if you want to run pnpm locally (optional for Docker-only use).
   - pnpm (recommended via Corepack) if running locally:
     ```bash
     corepack enable
     corepack prepare pnpm@9.12.3 --activate
     ```
   - Make (optional). If you do not have `make`, use the npm scripts or the PowerShell helper below.
2. Copy environment template:
   ```bash
   cp .env.example .env
   ```
3. Start the stack (choose one):
   ```bash
   make up
   ```
   ```bash
   pnpm up
   ```
   ```bash
   npm run up
   ```
   ```powershell
   ./scripts/nph.ps1 up
   ```
4. Access services:
   - Web: http://localhost:3000
   - API health: http://localhost:3001/v1/health
   - API docs: http://localhost:3001/docs
   - Gateway: http://localhost:8080
   - Prometheus: http://localhost:9090
   - Grafana: http://localhost:3002

## Common Commands (No Make Required)
```bash
pnpm up
pnpm down
pnpm db-migrate
```

## If you cannot run `npm install` or don’t want local dependencies
- You can still run the full stack using Docker only:
  ```bash
  docker compose up --build
  ```
- All services install dependencies inside the containers. You do not need local `node_modules` unless you want to develop without Docker.

## Monorepo Layout
```
apps/
packages/
infra/
docs/
scripts/
.github/
```
