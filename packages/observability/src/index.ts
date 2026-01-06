import pino from 'pino';
import client from 'prom-client';

export const logger = pino({ level: process.env.LOG_LEVEL ?? 'info' });

export const metricsRegistry = new client.Registry();
client.collectDefaultMetrics({ register: metricsRegistry });

export const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_ms',
  help: 'HTTP request duration in ms',
  labelNames: ['method', 'route', 'status_code'],
  registers: [metricsRegistry],
});
