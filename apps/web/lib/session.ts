import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

export type UserRole = 'SUPER_ADMIN' | 'ORG_ADMIN' | 'OPERATOR' | 'ANALYST' | 'WORKER';

export type Session = {
  userId: string;
  role: UserRole;
  orgName?: string | null;
};

type TokenPayload = {
  sub: string;
  role: UserRole;
  orgName?: string | null;
  type: 'access' | 'refresh';
};

const getJwtSecret = () => new TextEncoder().encode(process.env.JWT_SECRET ?? 'nph-dev-secret');

const getTokenFromCookie = (cookieHeader?: string | null): string | null => {
  if (!cookieHeader) {
    return null;
  }
  const match = cookieHeader.match(/nph_access=([^;]+)/);
  if (!match) {
    return null;
  }
  return decodeURIComponent(match[1]);
};

const parseToken = async (token?: string | null): Promise<Session | null> => {
  if (!token) {
    return null;
  }
  try {
    const { payload } = await jwtVerify(token, getJwtSecret());
    const data = payload as TokenPayload;
    if (!data?.sub || !data?.role || data.type !== 'access') {
      return null;
    }
    return { userId: data.sub, role: data.role, orgName: data.orgName };
  } catch {
    return null;
  }
};

export const getSessionFromCookies = async (): Promise<Session | null> => {
  const store = cookies();
  const raw = store.get('nph_access')?.value ?? null;
  return parseToken(raw);
};

export const getSessionFromHeader = async (cookieHeader?: string | null): Promise<Session | null> => {
  const raw = getTokenFromCookie(cookieHeader);
  return parseToken(raw);
};
