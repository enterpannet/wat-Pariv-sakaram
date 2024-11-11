import axios from 'axios';
// ดึงข้อมูลรายรับจาก API
export const getIncomes = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/income`);
        return response.data;
    } catch (error) {
        console.error('Error fetching incomes:', error);
    }
};

// Get all expenses
export const fetchExpenses = async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/expenses`);
    return response.data;
};

// Create a new expense
export const createExpense = async (amount, description) => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/expenses`, { amount, description });
    return response.data;
};

// Edit an expense
export const editExpense = async (id, amount, description) => {
    const response = await axios.put(`${import.meta.env.VITE_API_URL}/expenses/${id}`, { amount, description });
    return response.data;
};

// Delete an expense
export const deleteExpense = async (id) => {
    const response = await axios.delete(`${import.meta.env.VITE_API_URL}/expenses/${id}`);
    return response.data;
};
// apiService.js
export const fetchUsers = async (setUsers) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
        setUsers(response.data);  // ตั้งค่าผลลัพธ์ที่ได้ใน state
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};


export const addUser = async (newUser) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/users`, newUser, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 201) {
            fetchUsers();
        }
    } catch (error) {
        console.error('Error adding user:', error);
    }
};

export const deleteUser = async (id) => {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_API_URL}/users/${id}`);
        if (response.status === 200) {
            fetchUsers();
        }
    } catch (error) {
        console.error('Error deleting user:', error);
    }
};
export const toggleActiveStatus = async (id) => {
    try {
        await axios.patch(`${import.meta.env.VITE_API_URL}/users/${id}/active-status`, {
            isActive: !users.find(user => user.id === id).isActive,
        });
        // Refresh the user list after update, without altering the order
        setUsers(prevUsers => prevUsers.map(user =>
            user.id === id ? { ...user, isActive: !user.isActive } : user
        ));
    } catch (error) {
        console.error('Error updating user status:', error);
    }
};

export const toggleSetdownStatus = async (id) => {
    try {
        await axios.patch(`${import.meta.env.VITE_API_URL}/users/${id}/setdown-status`, {
            IsSetdown: !users.find(user => user.id === id).IsSetdown,
        });
        // Refresh the user list after update, without altering the order
        setUsers(prevUsers => prevUsers.map(user =>
            user.id === id ? { ...user, IsSetdown: !user.IsSetdown } : user
        ));
    } catch (error) {
        console.error('Error updating user setdown status:', error);
    }
};