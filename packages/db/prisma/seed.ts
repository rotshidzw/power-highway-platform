import { PrismaClient } from '@prisma/client';
import argon2 from 'argon2';

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

  const passwordHash = await argon2.hash('password123');

  const demoUsers = [
    {
      email: 'admin@powerhighway.co.za',
      fullName: 'Power Highway Admin',
      orgName: 'Power Highway',
      role: 'SUPER_ADMIN',
      status: 'ACTIVE',
      passwordHash,
    },
    {
      email: 'ops@gridworks.co.za',
      fullName: 'GridWorks Operator',
      orgName: 'GridWorks',
      role: 'OPERATOR',
      status: 'ACTIVE',
      passwordHash,
    },
    {
      email: 'analyst@regulator.gov.za',
      fullName: 'Regulator Analyst',
      orgName: 'National Regulator',
      role: 'ANALYST',
      status: 'ACTIVE',
      passwordHash,
    },
  ];

  for (const user of demoUsers) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: user,
      create: user,
    });
  }

  await prisma.accessRequest.createMany({
    data: [
      {
        email: 'procurement@easternrenewables.co.za',
        fullName: 'Eastern Renewables Procurement',
        orgName: 'Eastern Renewables',
        department: 'Procurement',
        status: 'PENDING',
      },
      {
        email: 'legal@metroenergy.co.za',
        fullName: 'Metro Energy Legal',
        orgName: 'Metro Energy',
        department: 'Legal',
        status: 'PENDING',
      },
    ],
    skipDuplicates: true,
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
