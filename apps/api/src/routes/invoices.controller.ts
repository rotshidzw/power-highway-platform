import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('invoices')
@Controller('invoices')
export class InvoicesController {
  @Get()
  list() {
    return [
      {
        id: 'inv-1',
        contractId: 'contract-1',
        totalAmount: 125000,
        currency: 'ZAR',
        status: 'pending',
      },
    ];
  }
}
