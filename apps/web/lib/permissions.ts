import type { UserRole } from './session';

export type NavGroup = 'Overview' | 'Operations' | 'Commercial' | 'Administration';

export type RouteConfig = {
  path: string;
  label: string;
  roles: UserRole[];
  group?: NavGroup;
  showInNav?: boolean;
};

export const routePermissions: RouteConfig[] = [
  { path: '/app', label: 'App', roles: ['SUPER_ADMIN', 'ORG_ADMIN', 'OPERATOR', 'ANALYST', 'WORKER'], showInNav: false },
  { path: '/app/dashboard', label: 'Dashboard', roles: ['SUPER_ADMIN', 'ORG_ADMIN', 'OPERATOR', 'ANALYST'], group: 'Overview' },
  { path: '/app/corridors', label: 'Corridors', roles: ['SUPER_ADMIN', 'ORG_ADMIN', 'OPERATOR', 'ANALYST'], group: 'Operations' },
  { path: '/app/contracts', label: 'Contracts', roles: ['SUPER_ADMIN', 'ORG_ADMIN', 'OPERATOR'], group: 'Commercial' },
  { path: '/app/energy-flows', label: 'Energy Flows', roles: ['SUPER_ADMIN', 'ORG_ADMIN', 'OPERATOR', 'ANALYST'], group: 'Operations' },
  { path: '/app/billing', label: 'Billing', roles: ['SUPER_ADMIN', 'ORG_ADMIN', 'ANALYST'], group: 'Commercial' },
  { path: '/app/admin/users', label: 'Admin Users', roles: ['SUPER_ADMIN', 'ORG_ADMIN'], group: 'Administration' },
  { path: '/app/admin/audit', label: 'Audit Logs', roles: ['SUPER_ADMIN', 'ORG_ADMIN', 'ANALYST'], group: 'Administration' },
  { path: '/app/admin/feature-flags', label: 'Feature Flags', roles: ['SUPER_ADMIN'], group: 'Administration' },
];

export const getRouteConfig = (pathname: string): RouteConfig | undefined => {
  const matches = routePermissions.filter((route) => pathname.startsWith(route.path));
  return matches.sort((a, b) => b.path.length - a.path.length)[0];
};

export const hasAccess = (role: UserRole, pathname: string): boolean => {
  const route = getRouteConfig(pathname);
  if (!route) {
    return role === 'SUPER_ADMIN';
  }
  return route.roles.includes(role);
};
