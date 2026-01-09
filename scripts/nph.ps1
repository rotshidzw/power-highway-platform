param(
  [Parameter(Mandatory = $true)]
  [ValidateSet("up", "down", "db-migrate")]
  [string]$Command
)

switch ($Command) {
  "up" { docker compose up --build }
  "down" { docker compose down --volumes }
  "db-migrate" { docker compose run --rm api pnpm --filter @nph/db prisma migrate deploy }
}
