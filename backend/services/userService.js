// services/userService.js
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

export const deleteUserById = async (id) => {
    return await prisma.user.delete({
        where: { id: parseInt(id) },
    });
};
export const updateUserStatus = async (id, isActive) => {
    return await prisma.user.update({
        where: { id: parseInt(id) },
        data: { isActive },
    });
};

export const updateUserSetdown = async (id, IsSetdown) => {
    return await prisma.user.update({
        where: { id: parseInt(id) },
        data: { IsSetdown }
    });
};