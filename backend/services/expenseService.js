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

// ฟังก์ชันเพื่อแก้ไขข้อมูลรายจ่าย
const editExpense = async (id, amount, description) => {
    return await prisma.expense.update({
        where: { id: parseInt(id) },
        data: { amount, description },
    });
};

// ฟังก์ชันเพื่อลบข้อมูลรายจ่าย
const deleteExpense = async (id) => {
    return await prisma.expense.delete({
        where: { id: parseInt(id) },
    });
};

export { getAllExpenses, createExpense, editExpense, deleteExpense };
