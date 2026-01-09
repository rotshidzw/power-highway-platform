import { describe, expect, it } from 'vitest';
import { createEntry, verifyChain } from '../src/index';

describe('verifyChain', () => {
  it('verifies a linked ledger chain', () => {
    const first = createEntry({ energyKwh: 100 });
    const second = createEntry({ energyKwh: 200 }, first.currentHash);
    const third = createEntry({ energyKwh: 300 }, second.currentHash);

    expect(verifyChain([first, second, third])).toBe(true);
  });
});
