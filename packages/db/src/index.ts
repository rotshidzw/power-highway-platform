import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

type CreateData<T> = T extends { create(args: infer A): unknown }
  ? A extends { data: infer D }
    ? D
    : never
  : never;

type CreateDelegate<T> = {
  create: (args: { data: CreateData<T> }) => unknown;
};

export const corridorRepository = {
  list: () => prisma.gridCorridor.findMany(),
  create: (data: CreateData<typeof prisma.gridCorridor>) =>
    (prisma.gridCorridor as CreateDelegate<typeof prisma.gridCorridor>).create({ data }),
};

export const contractRepository = {
  list: () => prisma.wheelingContract.findMany(),
  create: (data: CreateData<typeof prisma.wheelingContract>) =>
    (prisma.wheelingContract as CreateDelegate<typeof prisma.wheelingContract>).create({ data }),
};
