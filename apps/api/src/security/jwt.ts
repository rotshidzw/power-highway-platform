import jwt, { type Secret } from 'jsonwebtoken';

export type TokenPayload = {
  sub: string;
  role: string;
  orgName?: string | null;
  type: 'access' | 'refresh';
};

const JWT_SECRET: Secret = process.env.JWT_SECRET ?? 'nph-dev-secret';
const ACCESS_EXPIRES_IN = process.env.JWT_ACCESS_EXPIRES_IN ?? '15m';
const REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN ?? '7d';

export const signAccessToken = (payload: Omit<TokenPayload, 'type'>): string =>
  jwt.sign({ ...payload, type: 'access' }, JWT_SECRET, { expiresIn: ACCESS_EXPIRES_IN });

export const signRefreshToken = (payload: Omit<TokenPayload, 'type'>): string =>
  jwt.sign({ ...payload, type: 'refresh' }, JWT_SECRET, { expiresIn: REFRESH_EXPIRES_IN });

export const verifyToken = (token: string): TokenPayload =>
  jwt.verify(token, JWT_SECRET) as TokenPayload;
