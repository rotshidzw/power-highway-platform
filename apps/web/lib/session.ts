import { cookies } from 'next/headers';

export type UserRole = 'SUPER_ADMIN' | 'ORG_ADMIN' | 'OPERATOR' | 'ANALYST' | 'WORKER';

export type Session = {
  userId: string;
  role: UserRole;
  orgId: string;
};

const parseSessionValue = (value: string | undefined): Session | null => {
  if (!value) {
    return null;
  }
  try {
    const parsed = JSON.parse(value) as Session;
    if (parsed?.userId && parsed?.role && parsed?.orgId) {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
};

export const getSessionFromCookies = (): Session | null => {
  const store = cookies();
  const raw = store.get('nph_session')?.value;
  return parseSessionValue(raw);
};

export const getSessionFromHeader = (cookieHeader?: string | null): Session | null => {
  if (!cookieHeader) {
    return null;
  }
  const match = cookieHeader.match(/nph_session=([^;]+)/);
  if (!match) {
    return null;
  }
  return parseSessionValue(decodeURIComponent(match[1]));
};
