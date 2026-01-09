export type FeeModifiers = {
  peakMultiplier?: number;
  offPeakMultiplier?: number;
};

export type FeeInput = {
  energyKwh: number;
  distanceKm: number;
  ratePerKwh: number;
  ratePerKm: number;
  isPeak?: boolean;
  modifiers?: FeeModifiers;
};

export type FeeBreakdown = {
  baseEnergyFee: number;
  distanceFee: number;
  peakAdjustment: number;
  total: number;
};

export const calculateWheelingFee = (input: FeeInput): FeeBreakdown => {
  const baseEnergyFee = input.energyKwh * input.ratePerKwh;
  const distanceFee = input.distanceKm * input.ratePerKm;
  const peakMultiplier = input.isPeak ? input.modifiers?.peakMultiplier ?? 1.1 : 1;
  const offPeakMultiplier = input.isPeak ? 1 : input.modifiers?.offPeakMultiplier ?? 1;
  const adjustment = (baseEnergyFee + distanceFee) * (peakMultiplier * offPeakMultiplier - 1);
  const total = baseEnergyFee + distanceFee + adjustment;

  return {
    baseEnergyFee,
    distanceFee,
    peakAdjustment: adjustment,
    total,
  };
};
