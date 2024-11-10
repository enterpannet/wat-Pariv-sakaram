import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// ฟังก์ชันเพื่อดึงข้อมูลรายรับทั้งหมดจากฐานข้อมูล
const getAllIncomes = async () => {
  return await prisma.income.findMany();
};

// ฟังก์ชันเพื่อเพิ่มข้อมูลรายรับใหม่
const createIncome = async (amount, description) => {
  return await prisma.income.create({
    data: {
      amount,
      description,
    },
  });
};

export { getAllIncomes, createIncome };
