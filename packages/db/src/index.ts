import { Prisma, PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export const corridorRepository = {
  list: () => prisma.gridCorridor.findMany(),
  create: (data: Prisma.GridCorridorCreateInput) =>
    prisma.gridCorridor.create({ data }),
};

export const contractRepository = {
  list: () => prisma.wheelingContract.findMany(),
  create: (data: Prisma.WheelingContractCreateInput) =>
    prisma.wheelingContract.create({ data }),
};
