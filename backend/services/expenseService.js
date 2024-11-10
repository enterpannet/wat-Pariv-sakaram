import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// ฟังก์ชันเพื่อดึงข้อมูลรายจ่ายทั้งหมดจากฐานข้อมูล
const getAllExpenses = async () => {
    return await prisma.expense.findMany();
};

// ฟังก์ชันเพื่อเพิ่มข้อมูลรายจ่ายใหม่
const createExpense = async (amount, description) => {
    return await prisma.expense.create({
        data: {
            amount,
            description,
        },
    });
};

export { getAllExpenses, createExpense };
