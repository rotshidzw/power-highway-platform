import { Test } from '@nestjs/testing';
import { describe, expect, it } from 'vitest';
import { HealthController } from '../src/routes/health.controller';

describe('HealthController', () => {
  it('returns ok status', async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [HealthController],
    }).compile();

    const controller = moduleRef.get(HealthController);
    expect(controller.health()).toEqual({ status: 'ok', service: 'nph-api' });
  });
});
