import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllUsers = async () => {
    return await prisma.user.findMany();
};

export const addUser = async (userData) => {
    return await prisma.user.create({
        data: userData,
    });
};