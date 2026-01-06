# Power Highway Platform
National Independent Transmission Grid Platform for South Africa.

## Development (Docker-first)
1. Copy environment template:
   ```bash
   cp .env.example .env
   ```
2. Start the stack:
   ```bash
   make up
   ```
3. Access services:
   - Web: http://localhost:3000
   - API health: http://localhost:3001/v1/health
   - API docs: http://localhost:3001/docs
   - Gateway: http://localhost:8080
   - Prometheus: http://localhost:9090
   - Grafana: http://localhost:3002

## Monorepo Layout
```
apps/
packages/
infra/
docs/
scripts/
.github/
```
