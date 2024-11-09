import { getAllUsers, addUser, deleteUserById, updateUserStatus, updateUserSetdown } from '../services/userService.js';

export const getUsers = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Error fetching users');
    }
};

export const createUser = async (req, res) => {
    const { name, lastName, age, monasticYears, templeAffiliation, province, phoneNumber, chronicIllness } = req.body;
    try {
        const newUser = await addUser({
            name,
            lastName,
            age,
            monasticYears,
            templeAffiliation,
            province,
            phoneNumber,
            chronicIllness: chronicIllness || null,
            isActive: false,
            IsSetdown: false
        });
        console.log(newUser);

        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).send('Error adding user');
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await deleteUserById(id);
        res.status(200).send('User deleted successfully');
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send('Error deleting user');
    }
};

export const updateUserActiveStatus = async (req, res) => {
    const { id } = req.params;
    const { isActive } = req.body;
    try {
        await updateUserStatus(id, isActive);
        res.status(200).send('User active status updated successfully');
    } catch (error) {
        console.error('Error updating user active status:', error);
        res.status(500).send('Error updating user active status');
    }
};

export const updateUserSetdownStatus = async (req, res) => {
    const { id } = req.params;
    const { IsSetdown } = req.body;
    try {
        await updateUserSetdown(id, IsSetdown);
        res.status(200).send('User setdown status updated successfully');
    } catch (error) {
        console.error('Error updating user setdown status:', error);
        res.status(500).send('Error updating user setdown status');
    }
};
