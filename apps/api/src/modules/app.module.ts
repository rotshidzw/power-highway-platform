import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HealthController } from '../routes/health.controller';
import { CorridorsController } from '../routes/corridors.controller';
import { ContractsController } from '../routes/contracts.controller';
import { LinesController } from '../routes/lines.controller';
import { EnergyFlowsController } from '../routes/energy-flows.controller';
import { InvoicesController } from '../routes/invoices.controller';
import { AdminController } from '../routes/admin.controller';
import { AuthController } from '../routes/auth.controller';
import { AuditMiddleware } from '../security/audit.middleware';

@Module({
  controllers: [
    HealthController,
    CorridorsController,
    LinesController,
    ContractsController,
    EnergyFlowsController,
    InvoicesController,
    AdminController,
    AuthController,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuditMiddleware).forRoutes('*');
  }
}
