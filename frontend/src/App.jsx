import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import UserTable from './components/UserTable';
import axios from 'axios';

import Income from './components/Income';
import Expense from './components/Expense';
import Summary from './components/Summary';
import { getIncomes, getExpenses } from './services/apiService';
function App() {
    const [users, setUsers] = useState([]);
    const [income, setIncome] = useState([]);
    const [expense, setExpense] = useState([]);
  
    useEffect(() => {
      // ดึงข้อมูลรายรับและรายจ่ายจาก API เมื่อโหลดหน้าเว็บ
      const fetchData = async () => {
        const incomes = await getIncomes();
        const expenses = await getExpenses();
        setIncome(incomes);
        setExpense(expenses);
      };
  
      fetchData();
    }, []);
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/users`);
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const addUser = async (newUser) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/users`, newUser, {
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

    const deleteUser = async (id) => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/v1/users/${id}`);
            if (response.status === 200) {
                fetchUsers();
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };
    const toggleActiveStatus = async (id) => {
        try {
            await axios.patch(`${import.meta.env.VITE_API_URL}/api/v1/users/${id}/active-status`, {
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
    
    const toggleSetdownStatus = async (id) => {
        try {
            await axios.patch(`${import.meta.env.VITE_API_URL}/api/v1/users/${id}/setdown-status`, {
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
    
    
    return (
        <Router>
            <Routes>
                <Route path="/" element={<RegisterForm addUser={addUser} />} />
                <Route 
                    path="/view" 
                    element={
                        <UserTable 
                            users={users} 
                            deleteUser={deleteUser} 
                            toggleActiveStatus={toggleActiveStatus} 
                            toggleSetdownStatus={toggleSetdownStatus} 
                        />
                    } 
                />
                <Route 
                path='/income' 
                element={
                    <Income />
                } />
            </Routes>
        </Router>
    );
}

export default App;
