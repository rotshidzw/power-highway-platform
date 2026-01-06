export enum Role {
  Admin = 'ADMIN',
  RegulatorReadonly = 'REGULATOR_READONLY',
  GridOwner = 'GRID_OWNER',
  Producer = 'PRODUCER',
  Buyer = 'BUYER',
  Investor = 'INVESTOR',
}

export type Permission =
  | 'corridors:read'
  | 'corridors:write'
  | 'contracts:read'
  | 'contracts:write'
  | 'ledger:read'
  | 'ledger:append'
  | 'billing:read'
  | 'admin:manage'
  | 'audit:read';

const rolePermissions: Record<Role, Permission[]> = {
  [Role.Admin]: [
    'corridors:read',
    'corridors:write',
    'contracts:read',
    'contracts:write',
    'ledger:read',
    'ledger:append',
    'billing:read',
    'admin:manage',
    'audit:read',
  ],
  [Role.RegulatorReadonly]: ['corridors:read', 'contracts:read', 'ledger:read', 'audit:read'],
  [Role.GridOwner]: ['corridors:read', 'corridors:write', 'contracts:read', 'contracts:write'],
  [Role.Producer]: ['contracts:read', 'contracts:write', 'ledger:append'],
  [Role.Buyer]: ['contracts:read', 'billing:read'],
  [Role.Investor]: ['billing:read', 'corridors:read'],
};

export const hasPermission = (role: Role, permission: Permission): boolean =>
  rolePermissions[role].includes(permission);

export const seedRoles = Object.values(Role);
