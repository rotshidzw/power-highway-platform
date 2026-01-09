.PHONY: up down db-migrate test

up:
	docker compose up --build

down:
	docker compose down --volumes

db-migrate:
	docker compose run --rm api pnpm --filter @nph/db prisma migrate deploy

test:
	docker compose run --rm api pnpm test
