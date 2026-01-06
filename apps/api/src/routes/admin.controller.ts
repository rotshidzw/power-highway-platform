import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

class CreateUserDto {
  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  fullName!: string;

  @IsString()
  role!: string;
}

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  @Post('users')
  createUser(@Body() dto: CreateUserDto) {
    return { id: crypto.randomUUID(), ...dto };
  }

  @Get('audit-logs')
  listAuditLogs() {
    return [{ id: 'audit-1', action: 'corridor.create', actorId: 'user-1' }];
  }

  @Get('feature-flags')
  listFeatureFlags() {
    return [{ id: 'flag-1', key: 'ledger-integrity', enabled: true }];
  }
}
