import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  await prisma.role.createMany({
    data: [
      { name: 'ADMIN', description: 'Full access' },
      { name: 'REGULATOR_READONLY', description: 'Regulator read-only' },
      { name: 'GRID_OWNER', description: 'Grid owner' },
      { name: 'PRODUCER', description: 'Power producer' },
      { name: 'BUYER', description: 'Power buyer' },
      { name: 'INVESTOR', description: 'Investor' },
    ],
    skipDuplicates: true,
  });

  await prisma.gridCorridor.create({
    data: {
      name: 'Northern Cape → Gauteng',
      originRegion: 'Northern Cape',
      destinationRegion: 'Gauteng',
      status: 'active',
      geometry: null,
    },
  });
};

main()
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
