import crypto from 'crypto';

export type LedgerEntry = {
  id: string;
  payload: Record<string, unknown>;
  previousHash?: string;
  currentHash: string;
  timestamp: string;
};

export const hashPayload = (payload: Record<string, unknown>, previousHash?: string): string => {
  const canonical = JSON.stringify(payload, Object.keys(payload).sort());
  return crypto.createHash('sha256').update(`${previousHash ?? ''}:${canonical}`).digest('hex');
};

export const createEntry = (payload: Record<string, unknown>, previousHash?: string): LedgerEntry => {
  const currentHash = hashPayload(payload, previousHash);
  return {
    id: crypto.randomUUID(),
    payload,
    previousHash,
    currentHash,
    timestamp: new Date().toISOString(),
  };
};

export const verifyChain = (entries: LedgerEntry[]): boolean => {
  for (let index = 0; index < entries.length; index += 1) {
    const entry = entries[index];
    const expected = hashPayload(entry.payload, entry.previousHash);
    if (expected !== entry.currentHash) {
      return false;
    }
    if (index > 0 && entry.previousHash !== entries[index - 1].currentHash) {
      return false;
    }
  }
  return true;
};
