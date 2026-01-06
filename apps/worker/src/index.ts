import { Queue, Worker } from 'bullmq';
import IORedis from 'ioredis';
import { calculateWheelingFee } from '@nph/contracts';
import { createEntry, verifyChain } from '@nph/ledger';

const connection = new IORedis(process.env.REDIS_URL ?? 'redis://localhost:6379');

const billingQueue = new Queue('billing', { connection });
const analyticsQueue = new Queue('analytics', { connection });
const ingestionQueue = new Queue('ingestion', { connection });
const simulationsQueue = new Queue('simulations', { connection });

new Worker(
  'billing',
  async () => {
    const fee = calculateWheelingFee({
      energyKwh: 1000,
      distanceKm: 300,
      ratePerKwh: 0.5,
      ratePerKm: 0.2,
    });
    return { invoiceTotal: fee.total };
  },
  { connection },
);

new Worker(
  'analytics',
  async () => ({ dailyRollup: true }),
  { connection },
);

new Worker(
  'ingestion',
  async () => ({ status: 'queued' }),
  { connection },
);

new Worker(
  'simulations',
  async () => ({ status: 'queued' }),
  { connection },
);

new Worker(
  'ledger.integrityCheck',
  async () => {
    const entry = createEntry({ energyKwh: 100 });
    return { ok: verifyChain([entry]) };
  },
  { connection },
);

void billingQueue.add('billing.monthlyInvoiceRun', {});
void analyticsQueue.add('analytics.dailyRollup', {});
void ingestionQueue.add('ingestion.futureDataFeeds', {});
void simulationsQueue.add('simulations.gridCapacityScenarios', {});
