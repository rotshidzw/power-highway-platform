import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import argon2 from 'argon2';
import { prisma } from '@nph/db';

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

  @Get('access-requests')
  async listAccessRequests() {
    return prisma.accessRequest.findMany({ orderBy: { requestedAt: 'desc' } });
  }

  @Post('access-requests/:id/approve')
  async approveAccessRequest(@Param('id') id: string) {
    const request = await prisma.accessRequest.findUnique({ where: { id } });
    if (!request) {
      return { ok: false, message: 'Request not found.' };
    }

    const passwordHash = await argon2.hash('password123');
    await prisma.user.upsert({
      where: { email: request.email },
      update: {
        status: 'ACTIVE',
        orgName: request.orgName,
        fullName: request.fullName,
      },
      create: {
        email: request.email,
        fullName: request.fullName,
        orgName: request.orgName,
        role: 'ORG_ADMIN',
        status: 'ACTIVE',
        passwordHash,
      },
    });

    await prisma.accessRequest.update({
      where: { id },
      data: { status: 'APPROVED', reviewedAt: new Date() },
    });

    return { ok: true };
  }

  @Post('access-requests/:id/reject')
  async rejectAccessRequest(@Param('id') id: string) {
    await prisma.accessRequest.update({
      where: { id },
      data: { status: 'REJECTED', reviewedAt: new Date() },
    });
    return { ok: true };
  }
}
