# ADR 0002: Append-only Energy Ledger

## Status
Accepted

## Context
Energy flow records require auditability and tamper-resistance for bankability.

## Decision
Store energy flows in an append-only ledger with chained hashes.

## Consequences
- Ledger entries are immutable by design.
- Daily integrity checks verify the hash chain.
