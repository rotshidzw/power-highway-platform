import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

class CreateEnergyFlowDto {
  @IsString()
  @IsNotEmpty()
  contractId!: string;

  @IsNumber()
  energyKwh!: number;

  @IsNumber()
  distanceKm!: number;

  @IsDateString()
  flowTimestamp!: string;
}

@ApiTags('energy-flows')
@Controller('energy-flows')
export class EnergyFlowsController {
  private readonly flows = [
    {
      id: 'flow-1',
      contractId: 'contract-1',
      energyKwh: 1000,
      distanceKm: 300,
      flowTimestamp: new Date().toISOString(),
    },
  ];

  @Get()
  list(@Query('contractId') contractId?: string) {
    if (contractId) {
      return this.flows.filter((flow) => flow.contractId === contractId);
    }
    return this.flows;
  }

  @Post()
  append(@Body() dto: CreateEnergyFlowDto) {
    const flow = { id: crypto.randomUUID(), ...dto };
    this.flows.push(flow);
    return flow;
  }
}
