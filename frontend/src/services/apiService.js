import axios from 'axios';
export const getIncomes = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/income`);
        return response.data;
    } catch (error) {
        console.error('Error fetching incomes:', error);
    }
};

// สร้างรายรับใหม่
export const createIncome = async (amount, description) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/income`, { amount, description });
        return response.data;
    } catch (error) {
        console.error("Error creating income:", error);
        throw error;
    }
};

// แก้ไขรายรับ
export const editIncome = async (id, amount, description) => {
    try {
        const response = await axios.put(`${import.meta.env.VITE_API_URL}/income/${id}`, { amount, description });
        return response.data;
    } catch (error) {
        console.error("Error editing income:", error);
        throw error;
    }
};

// ลบรายรับ
export const deleteIncome = async (id) => {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_API_URL}/income/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting income:", error);
        throw error;
    }
};

// ดึงข้อมูลรายจ่ายทั้งหมด
export const fetchExpenses = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/expenses`);
        return response.data;
    } catch (error) {
        console.error('Error fetching expenses:', error);
        throw new Error('ไม่สามารถดึงข้อมูลรายจ่ายได้');
    }
};

// สร้างรายจ่ายใหม่
export const createExpense = async (amount, description) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/expenses`, { amount, description });
        return response.data;
    } catch (error) {
        console.error("Error creating expense:", error);
        throw new Error('ไม่สามารถเพิ่มข้อมูลรายจ่ายได้');
    }
};

// แก้ไขรายจ่าย
export const editExpense = async (id, amount, description) => {
    try {
        const response = await axios.put(`${import.meta.env.VITE_API_URL}/expenses/${id}`, { amount, description });
        return response.data;
    } catch (error) {
        console.error("Error editing expense:", error);
        throw new Error('ไม่สามารถแก้ไขข้อมูลรายจ่ายได้');
    }
};

// ลบรายจ่าย
export const deleteExpense = async (id) => {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_API_URL}/expenses/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting expense:", error);
        throw new Error('ไม่สามารถลบข้อมูลรายจ่ายได้');
    }
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