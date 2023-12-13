import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

const prismaClientSingleton = () => {
  const baseClient = new PrismaClient();
  const extendedClient = baseClient.$extends(withAccelerate());
  return extendedClient as PrismaClient & typeof extendedClient;
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export const db = prisma;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;