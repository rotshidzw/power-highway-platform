import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

class CreateLineDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsNumber()
  capacityMw!: number;

  @IsString()
  status!: string;
}

@ApiTags('lines')
@Controller('lines')
export class LinesController {
  private readonly lines = [{ id: 'line-1', name: 'NC-GT-01', capacityMw: 200 }];

  @Get()
  list() {
    return this.lines;
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.lines.find((line) => line.id === id);
  }

  @Post()
  create(@Body() dto: CreateLineDto) {
    const line = { id: crypto.randomUUID(), ...dto };
    this.lines.push(line);
    return line;
  }
}
