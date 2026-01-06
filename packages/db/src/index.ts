import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export const corridorRepository = {
  list: () => prisma.gridCorridor.findMany(),
  create: (data: Parameters<typeof prisma.gridCorridor.create>[0]['data']) =>
    prisma.gridCorridor.create({ data }),
};

export const contractRepository = {
  list: () => prisma.wheelingContract.findMany(),
  create: (data: Parameters<typeof prisma.wheelingContract.create>[0]['data']) =>
    prisma.wheelingContract.create({ data }),
};
