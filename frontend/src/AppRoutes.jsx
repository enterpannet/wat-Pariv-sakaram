// src/AppRoutes.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import UserTable from './components/UserTable';
import Income from './components/Income';
import Expense from './components/Expense';
import Summary from './components/Summary';
import { addUser, deleteUser, toggleActiveStatus, toggleSetdownStatus } from './services/apiService';

const AppRoutes = ({ users, setUsers, income, setIncome, expense, setExpense }) => {
    return (
        <Routes>
            <Route path="/register" element={<RegisterForm addUser={addUser} />} />
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
                path="/income"
                element={
                    <Income setIncome={setIncome} />
                }
            />
            <Route
                path="/expense"
                element={
                    <Expense setExpense={setExpense} />
                }
            />
            <Route path="/summary" element={<Summary income={income} expense={expense} />} />
        </Routes>
    );
}

export default AppRoutes;
