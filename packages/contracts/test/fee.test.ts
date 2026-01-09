import { describe, expect, it } from 'vitest';
import { calculateWheelingFee } from '../src/index';

describe('calculateWheelingFee', () => {
  it('calculates base and distance fees', () => {
    const result = calculateWheelingFee({
      energyKwh: 1000,
      distanceKm: 300,
      ratePerKwh: 0.5,
      ratePerKm: 0.2,
    });

    expect(result.baseEnergyFee).toBe(500);
    expect(result.distanceFee).toBe(60);
    expect(result.total).toBe(560);
  });
});
