import { getAllUsers, addUser, deleteUserById } from '../services/userService.js';

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
