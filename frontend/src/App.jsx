import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import UserTable from './components/UserTable';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://210.246.215.231:5000/api/v1/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const addUser = async (newUser) => {
        try {
            const response = await axios.post('http://210.246.215.231:5000/api/v1/users', newUser, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                fetchUsers();
            }
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    const deleteUser = async (id) => {
        try {
            const response = await axios.delete(`http://210.246.215.231:5000/api/v1/users/${id}`);
            if (response.status === 200) {
                fetchUsers();
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<RegisterForm addUser={addUser} />} />
                <Route path="/view" element={<UserTable users={users} deleteUser={deleteUser} />} />
            </Routes>
        </Router>
    );
}

export default App;
