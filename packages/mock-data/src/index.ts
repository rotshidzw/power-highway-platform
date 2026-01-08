import { faker } from '@faker-js/faker';

faker.seed(42);

export type CorridorStatus = 'Active' | 'Planned' | 'Congested' | 'Maintenance';
export type ContractStatus = 'Active' | 'Paused' | 'At Risk' | 'Expired';
export type InvoiceStatus = 'Paid' | 'Pending' | 'Overdue';
export type AuditSeverity = 'Low' | 'Medium' | 'High';

export type Corridor = {
  id: string;
  name: string;
  region: string;
  voltageKv: number;
  capacityMw: number;
  currentFlowMw: number;
  utilization: number;
  status: CorridorStatus;
  updatedAt: string;
};

export type Contract = {
  id: string;
  counterparty: string;
  corridorId: string;
  corridorName: string;
  mw: number;
  startDate: string;
  endDate: string;
  status: ContractStatus;
  riskScore: number;
  tariff: number;
  lastSettlement: string;
};

export type EnergyFlow = {
  id: string;
  timestamp: string;
  corridorId: string;
  corridorName: string;
  meterPoint: string;
  mw: number;
  mwh: number;
  quality: 'Good' | 'Estimated' | 'Missing';
  anomaly: boolean;
};

export type Invoice = {
  id: string;
  org: string;
  period: string;
  amount: number;
  status: InvoiceStatus;
  dueDate: string;
  lineItems: InvoiceLineItem[];
};

export type InvoiceLineItem = {
  id: string;
  contractId: string;
  mwh: number;
  tariff: number;
  amount: number;
};

export type AuditEvent = {
  id: string;
  module: string;
  event: string;
  severity: AuditSeverity;
  actor: string;
  timestamp: string;
  resource: string;
};

export type UserRecord = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Invited' | 'Suspended';
  lastLogin: string;
};

export type FeatureFlag = {
  id: string;
  key: string;
  description: string;
  enabled: boolean;
  environment: 'Dev' | 'Staging' | 'Prod';
  updatedAt: string;
};

export type ImportJob = {
  id: string;
  fileName: string;
  source: string;
  rows: number;
  period: string;
  status: 'Processed' | 'Failed' | 'Queued';
  createdAt: string;
};

export type InvoiceTimelineItem = {
  id: string;
  label: string;
  date: string;
};

const corridorRegions = [
  'Northern Cape',
  'Eastern Cape',
  'Gauteng',
  'Mpumalanga',
  'KwaZulu-Natal',
  'Free State',
];

const corridorStatuses: CorridorStatus[] = ['Active', 'Planned', 'Congested', 'Maintenance'];
const contractStatuses: ContractStatus[] = ['Active', 'Paused', 'At Risk', 'Expired'];
const invoiceStatuses: InvoiceStatus[] = ['Paid', 'Pending', 'Overdue'];

const seededArray = <T,>(count: number, factory: () => T): T[] =>
  Array.from({ length: count }, factory);

export const generateCorridors = (count = 48): Corridor[] =>
  seededArray(count, () => {
    const capacity = faker.number.int({ min: 350, max: 1500 });
    const flow = faker.number.int({ min: 120, max: capacity });
    return {
      id: faker.string.uuid(),
      name: `${faker.location.city()} → ${faker.location.city()}`,
      region: faker.helpers.arrayElement(corridorRegions),
      voltageKv: faker.helpers.arrayElement([132, 220, 275, 400, 765]),
      capacityMw: capacity,
      currentFlowMw: flow,
      utilization: Number((flow / capacity).toFixed(2)),
      status: faker.helpers.arrayElement(corridorStatuses),
      updatedAt: faker.date.recent({ days: 10 }).toISOString(),
    };
  });

export const generateContracts = (corridors: Corridor[], count = 420): Contract[] =>
  seededArray(count, () => {
    const corridor = faker.helpers.arrayElement(corridors);
    return {
      id: `CTR-${faker.number.int({ min: 10000, max: 99999 })}`,
      counterparty: faker.company.name(),
      corridorId: corridor.id,
      corridorName: corridor.name,
      mw: faker.number.int({ min: 50, max: 400 }),
      startDate: faker.date.past({ years: 2 }).toISOString().slice(0, 10),
      endDate: faker.date.future({ years: 3 }).toISOString().slice(0, 10),
      status: faker.helpers.arrayElement(contractStatuses),
      riskScore: faker.number.int({ min: 1, max: 100 }),
      tariff: Number(faker.finance.amount({ min: 0.35, max: 1.25, dec: 2 })),
      lastSettlement: faker.date.recent({ days: 30 }).toISOString().slice(0, 10),
    };
  });

export const generateFlows = (corridors: Corridor[], count = 12000): EnergyFlow[] =>
  seededArray(count, () => {
    const corridor = faker.helpers.arrayElement(corridors);
    const mw = faker.number.int({ min: 10, max: corridor.capacityMw });
    return {
      id: faker.string.uuid(),
      timestamp: faker.date.recent({ days: 14 }).toISOString(),
      corridorId: corridor.id,
      corridorName: corridor.name,
      meterPoint: `MP-${faker.number.int({ min: 100, max: 999 })}`,
      mw,
      mwh: Number((mw * faker.number.float({ min: 0.5, max: 1.2 })).toFixed(2)),
      quality: faker.helpers.arrayElement(['Good', 'Estimated', 'Missing']),
      anomaly: faker.datatype.boolean({ probability: 0.08 }),
    };
  });

export const generateInvoices = (contracts: Contract[], count = 160): Invoice[] =>
  seededArray(count, () => {
    const lineItems = seededArray(faker.number.int({ min: 2, max: 6 }), () => {
      const contract = faker.helpers.arrayElement(contracts);
      const mwh = faker.number.int({ min: 1200, max: 18000 });
      const tariff = Number(faker.finance.amount({ min: 0.35, max: 1.1, dec: 2 }));
      return {
        id: faker.string.uuid(),
        contractId: contract.id,
        mwh,
        tariff,
        amount: Number((mwh * tariff).toFixed(2)),
      };
    });

    const total = lineItems.reduce((sum, item) => sum + item.amount, 0);
    return {
      id: `INV-${faker.number.int({ min: 1000, max: 9999 })}`,
      org: faker.company.name(),
      period: `${faker.date.recent({ days: 90 }).toISOString().slice(0, 7)}`,
      amount: Number(total.toFixed(2)),
      status: faker.helpers.arrayElement(invoiceStatuses),
      dueDate: faker.date.soon({ days: 20 }).toISOString().slice(0, 10),
      lineItems,
    };
  });

export const generateAuditLogs = (count = 200): AuditEvent[] =>
  seededArray(count, () => ({
    id: faker.string.uuid(),
    module: faker.helpers.arrayElement(['Contracts', 'Billing', 'Ledger', 'Admin', 'Corridors']),
    event: faker.hacker.phrase(),
    severity: faker.helpers.arrayElement(['Low', 'Medium', 'High']),
    actor: faker.internet.email(),
    timestamp: faker.date.recent({ days: 30 }).toISOString(),
    resource: faker.helpers.arrayElement(['Contract', 'Invoice', 'Corridor', 'User']),
  }));

export const generateUsers = (count = 60): UserRecord[] =>
  seededArray(count, () => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    role: faker.helpers.arrayElement(['SUPER_ADMIN', 'ORG_ADMIN', 'OPERATOR', 'ANALYST', 'WORKER']),
    status: faker.helpers.arrayElement(['Active', 'Invited', 'Suspended']),
    lastLogin: faker.date.recent({ days: 14 }).toISOString(),
  }));

export const generateFeatureFlags = (): FeatureFlag[] =>
  [
    {
      id: faker.string.uuid(),
      key: 'ledger-integrity',
      description: 'Daily chain verification checks',
      enabled: true,
      environment: 'Prod',
      updatedAt: faker.date.recent({ days: 5 }).toISOString(),
    },
    {
      id: faker.string.uuid(),
      key: 'simulations-beta',
      description: 'Corridor congestion simulation workflow',
      enabled: false,
      environment: 'Staging',
      updatedAt: faker.date.recent({ days: 7 }).toISOString(),
    },
    {
      id: faker.string.uuid(),
      key: 'invoice-v2',
      description: 'Enhanced billing line items',
      enabled: true,
      environment: 'Dev',
      updatedAt: faker.date.recent({ days: 2 }).toISOString(),
    },
  ];

export const generateImports = (count = 24): ImportJob[] =>
  seededArray(count, () => ({
    id: faker.string.uuid(),
    fileName: `${faker.word.noun()}-flows-${faker.number.int({ min: 1, max: 12 })}.csv`,
    source: faker.helpers.arrayElement(['SCADA', 'Market Operator', 'Metering Hub']),
    rows: faker.number.int({ min: 1200, max: 48000 }),
    period: `${faker.date.recent({ days: 120 }).toISOString().slice(0, 7)}`,
    status: faker.helpers.arrayElement(['Processed', 'Failed', 'Queued']),
    createdAt: faker.date.recent({ days: 30 }).toISOString(),
  }));

export const generateInvoiceTimeline = (): InvoiceTimelineItem[] => [
  { id: faker.string.uuid(), label: 'Issued', date: faker.date.recent({ days: 12 }).toISOString() },
  { id: faker.string.uuid(), label: 'Reviewed', date: faker.date.recent({ days: 8 }).toISOString() },
  { id: faker.string.uuid(), label: 'Approved', date: faker.date.recent({ days: 4 }).toISOString() },
  { id: faker.string.uuid(), label: 'Paid', date: faker.date.recent({ days: 1 }).toISOString() },
];

export const getMockData = () => {
  faker.seed(42);
  const corridors = generateCorridors();
  const contracts = generateContracts(corridors);
  const flows = generateFlows(corridors);
  const invoices = generateInvoices(contracts);
  return {
    corridors,
    contracts,
    flows,
    invoices,
    imports: generateImports(),
    auditLogs: generateAuditLogs(),
    users: generateUsers(),
    featureFlags: generateFeatureFlags(),
  };
};
