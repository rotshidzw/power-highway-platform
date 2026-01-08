import { Body, Controller, ForbiddenException, Get, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import argon2 from 'argon2';
import { serialize, parse } from 'cookie';
import { prisma } from '@nph/db';
import type { Response } from 'express';
import { signAccessToken, signRefreshToken, verifyToken } from '../security/jwt';

type RequestWithHeaders = {
  headers: Record<string, string | string[] | undefined>;
  ip?: string;
};

const ACCESS_COOKIE = 'nph_access';
const REFRESH_COOKIE = 'nph_refresh';
const ACCESS_COOKIE_MAX_AGE = 60 * 15;
const REFRESH_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

const loginAttempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 60_000;

class LoginDto {
  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}

class AccessRequestDto {
  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  fullName!: string;

  @IsString()
  @IsNotEmpty()
  orgName!: string;

  @IsOptional()
  @IsString()
  department?: string;
}

const buildCookieOptions = (maxAge: number) => ({
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  maxAge,
});

const getTokenFromRequest = (req: RequestWithHeaders): string | null => {
  const header = req.headers.authorization;
  if (typeof header === 'string' && header.startsWith('Bearer ')) {
    return header.slice('Bearer '.length);
  }
  const cookieHeader = Array.isArray(req.headers.cookie) ? req.headers.cookie.join(';') : req.headers.cookie;
  if (!cookieHeader) {
    return null;
  }
  const cookies = parse(cookieHeader);
  return cookies[ACCESS_COOKIE] ?? null;
};

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  @Post('login')
  async login(@Body() dto: LoginDto, @Req() req: RequestWithHeaders, @Res({ passthrough: true }) res: Response) {
    const ip = req.ip ?? 'unknown';
    const now = Date.now();
    const record = loginAttempts.get(ip);
    if (record && record.resetAt > now && record.count >= MAX_ATTEMPTS) {
      throw new ForbiddenException('Too many login attempts. Try again later.');
    }
    if (!record || record.resetAt <= now) {
      loginAttempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    } else {
      loginAttempts.set(ip, { ...record, count: record.count + 1 });
    }

    const email = dto.email.toLowerCase();
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.passwordHash) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const valid = await argon2.verify(user.passwordHash, dto.password);
    if (!valid) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    if (user.status !== 'ACTIVE') {
      throw new ForbiddenException('Access request pending approval.');
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    const accessToken = signAccessToken({ sub: user.id, role: user.role, orgName: user.orgName });
    const refreshToken = signRefreshToken({ sub: user.id, role: user.role, orgName: user.orgName });

    res.setHeader('Set-Cookie', [
      serialize(ACCESS_COOKIE, accessToken, buildCookieOptions(ACCESS_COOKIE_MAX_AGE)),
      serialize(REFRESH_COOKIE, refreshToken, buildCookieOptions(REFRESH_COOKIE_MAX_AGE)),
    ]);

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        orgName: user.orgName,
        status: user.status,
      },
      accessToken,
    };
  }

  @Post('refresh')
  async refresh(@Req() req: RequestWithHeaders, @Res({ passthrough: true }) res: Response) {
    const cookieHeader = Array.isArray(req.headers.cookie) ? req.headers.cookie.join(';') : req.headers.cookie;
    const cookies = parse(cookieHeader ?? '');
    const refreshToken = cookies[REFRESH_COOKIE];
    if (!refreshToken) {
      throw new UnauthorizedException('Missing refresh token.');
    }
    const payload = verifyToken(refreshToken);
    if (payload.type !== 'refresh') {
      throw new UnauthorizedException('Invalid refresh token.');
    }
    const user = await prisma.user.findUnique({ where: { id: payload.sub } });
    if (!user || user.status !== 'ACTIVE') {
      throw new UnauthorizedException('User not found or inactive.');
    }
    const accessToken = signAccessToken({ sub: user.id, role: user.role, orgName: user.orgName });
    res.setHeader('Set-Cookie', serialize(ACCESS_COOKIE, accessToken, buildCookieOptions(ACCESS_COOKIE_MAX_AGE)));
    return { accessToken };
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.setHeader('Set-Cookie', [
      serialize(ACCESS_COOKIE, '', buildCookieOptions(0)),
      serialize(REFRESH_COOKIE, '', buildCookieOptions(0)),
    ]);
    return { ok: true };
  }

  @Get('me')
  async me(@Req() req: RequestWithHeaders) {
    const token = getTokenFromRequest(req);
    if (!token) {
      throw new UnauthorizedException('Not authenticated.');
    }
    const payload = verifyToken(token);
    if (payload.type !== 'access') {
      throw new UnauthorizedException('Invalid access token.');
    }
    const user = await prisma.user.findUnique({ where: { id: payload.sub } });
    if (!user) {
      throw new UnauthorizedException('User not found.');
    }
    return {
      id: user.id,
      email: user.email,
      role: user.role,
      orgName: user.orgName,
      status: user.status,
    };
  }

  @Post('request-access')
  async requestAccess(@Body() dto: AccessRequestDto) {
    const accessRequest = await prisma.accessRequest.create({
      data: {
        email: dto.email.toLowerCase(),
        fullName: dto.fullName,
        orgName: dto.orgName,
        department: dto.department,
        status: 'PENDING',
      },
    });
    return {
      id: accessRequest.id,
      status: accessRequest.status,
    };
  }
}
