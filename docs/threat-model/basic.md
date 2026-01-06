# Threat Model (Basic)

## Assets
- Energy flow ledger integrity
- Wheeling contracts and tariffs
- Audit logs and regulatory reports

## Threats
- Unauthorized access to contracts or energy flows
- Tampering with ledger history
- Data exfiltration via misconfigured CORS

## Mitigations
- RBAC and policy enforcement in API
- Append-only ledger with hash chaining
- Request rate limiting and structured audit logging
- Security headers and strict CORS configuration
