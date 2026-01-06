import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AuditMiddleware implements NestMiddleware {
  use(req: { method: string; originalUrl: string }, res: { on: (event: string, cb: () => void) => void }, next: () => void) {
    res.on('finish', () => {
      if (!req.method.startsWith('GET')) {
        // placeholder for audit log persistence
        // eslint-disable-next-line no-console
        console.log(`AUDIT ${req.method} ${req.originalUrl}`);
      }
    });
    next();
  }
}
