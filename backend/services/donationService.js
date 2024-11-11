import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getAllDonations = async () => {
  return await prisma.donation.findMany();
};

const createDonation = async (donorName, address, items, amount) => {
  return await prisma.donation.create({
    data: { donorName, address, items, amount },
  });
};

export { getAllDonations, createDonation };
