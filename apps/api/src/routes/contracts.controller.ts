import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

class CreateContractDto {
  @IsString()
  @IsNotEmpty()
  corridorId!: string;

  @IsString()
  producerId!: string;

  @IsString()
  buyerId!: string;

  @IsString()
  tariffId!: string;

  @IsNumber()
  contractTermYears!: number;

  @IsNumber()
  contractedCapacityMw!: number;

  @IsDateString()
  startDate!: string;

  @IsDateString()
  endDate!: string;

  @IsString()
  status!: string;
}

@ApiTags('contracts')
@Controller('contracts')
export class ContractsController {
  private readonly contracts = [{ id: 'contract-1', corridorId: 'demo', status: 'active' }];

  @Get()
  list() {
    return this.contracts;
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.contracts.find((contract) => contract.id === id);
  }

  @Post()
  create(@Body() dto: CreateContractDto) {
    const contract = { id: crypto.randomUUID(), ...dto };
    this.contracts.push(contract);
    return contract;
  }
}
