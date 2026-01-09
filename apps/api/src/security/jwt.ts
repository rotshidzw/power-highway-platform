import jwt, { type Secret, type SignOptions } from 'jsonwebtoken';

export type TokenPayload = {
  sub: string;
  role: string;
  orgName?: string | null;
  type: 'access' | 'refresh';
};

const JWT_SECRET: Secret = process.env.JWT_SECRET ?? 'dev_insecure_secret_change_me';
const ACCESS_EXPIRES_IN: SignOptions['expiresIn'] =
  (process.env.ACCESS_EXPIRES_IN ?? '15m') as SignOptions['expiresIn'];
const REFRESH_EXPIRES_IN: SignOptions['expiresIn'] =
  (process.env.REFRESH_EXPIRES_IN ?? '7d') as SignOptions['expiresIn'];

export const signAccessToken = (payload: Omit<TokenPayload, 'type'>): string =>
  jwt.sign({ ...payload, type: 'access' }, JWT_SECRET, { expiresIn: ACCESS_EXPIRES_IN });

export const signRefreshToken = (payload: Omit<TokenPayload, 'type'>): string =>
  jwt.sign({ ...payload, type: 'refresh' }, JWT_SECRET, { expiresIn: REFRESH_EXPIRES_IN });

export const verifyToken = (token: string): TokenPayload =>
  jwt.verify(token, JWT_SECRET) as TokenPayload;
