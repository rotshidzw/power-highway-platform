import { Prisma, PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export const corridorRepository = {
  list: () => prisma.gridCorridor.findMany(),
  create: (data: Prisma.GridCorridorCreateArgs['data']) =>
    prisma.gridCorridor.create({ data }),
};

export const contractRepository = {
  list: () => prisma.wheelingContract.findMany(),
  create: (data: Prisma.WheelingContractCreateArgs['data']) =>
    prisma.wheelingContract.create({ data }),
};
