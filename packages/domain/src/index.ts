export type UUID = string;

export interface Corridor {
  id: UUID;
  name: string;
  originRegion: string;
  destinationRegion: string;
  status: 'planned' | 'active' | 'congested';
  capacityMw: number;
}

export interface TransmissionLine {
  id: UUID;
  corridorId: UUID;
  name: string;
  capacityMw: number;
  voltageKv?: number;
  lengthKm?: number;
  status: 'planned' | 'active' | 'congested';
}

export interface WheelingContract {
  id: UUID;
  corridorId: UUID;
  producerId: UUID;
  buyerId: UUID;
  tariffId: UUID;
  contractTermYears: number;
  contractedCapacityMw: number;
  startDate: string;
  endDate: string;
  status: 'draft' | 'active' | 'suspended' | 'terminated';
}

export interface Tariff {
  id: UUID;
  ratePerKwh: number;
  ratePerKm: number;
  currency: string;
}

export interface EnergyFlow {
  id: UUID;
  contractId: UUID;
  corridorId: UUID;
  producerId: UUID;
  buyerId: UUID;
  energyKwh: number;
  distanceKm: number;
  flowTimestamp: string;
  ledgerHash: string;
  previousHash?: string;
}

export interface Invoice {
  id: UUID;
  contractId: UUID;
  billingPeriod: string;
  totalAmount: number;
  currency: string;
}
