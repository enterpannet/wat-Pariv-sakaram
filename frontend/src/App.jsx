import { useState, useEffect } from 'react';
import RegisterForm from './components/RegisterForm';
import UserTable from './components/UserTable';
import axios from 'axios';

function App() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/v1/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const addUser = async (newUser) => {
        try {
            const response = await axios.post('http://localhost:5000/api/v1/users', newUser, {
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
            const response = await axios.delete(`http://localhost:5000/api/v1/users/${id}`);
            if (response.status === 200) {
                fetchUsers();
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <RegisterForm addUser={addUser} />
            {/* <UserTable users={users} deleteUser={deleteUser} /> */}
        </div>
    );
}

export default App;
