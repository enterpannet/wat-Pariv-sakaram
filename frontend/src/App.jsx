// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import axios from 'axios';

import { getIncomes, fetchExpenses, fetchUsers } from './services/apiService';
import AppRoutes from './AppRoutes'; // นำเข้าคอมโพเนนต์ AppRoutes

function App() {
    const [users, setUsers] = useState([]);
    const [income, setIncome] = useState([]);
    const [expense, setExpense] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false); // สำหรับเปิด/ปิดเมนู

    useEffect(() => {
        const fetchData = async () => {
            const incomes = await getIncomes();
            const expenses = await fetchExpenses();
            setIncome(incomes);
            setExpense(expenses);
        };

        fetchData();
    }, []);

    useEffect(() => {
        fetchUsers(setUsers);
    }, []);

    return (
        <Router>
            <div className="min-h-screen bg-gray-100">
                {/* Navbar */}
                <div className="bg-blue-600 text-white p-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold">วัดหนองขนาก</h2>
                        {/* Hamburger icon */}
                        <button
                            className="lg:hidden text-white"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Nav links */}
                    <nav>
                        <ul
                            className={`${
                                isMenuOpen ? 'block' : 'hidden'
                            } lg:flex lg:space-x-4 mt-4 lg:mt-0`}
                        >
                            <li>
                                <Link to="/register" className="text-white hover:text-yellow-200">ลงทะเบียนพระปริวาส</Link>
                            </li>
                            <li>
                                <Link to="/view" className="text-white hover:text-yellow-200">ตารางรายชื่อพระ</Link>
                            </li>
                            <li>
                                <Link to="/income" className="text-white hover:text-yellow-200">บันทึกรายรับ</Link>
                            </li>
                            <li>
                                <Link to="/expense" className="text-white hover:text-yellow-200">บันทึกรายจ่าย</Link>
                            </li>
                            <li>
                                <Link to="/summary" className="text-white hover:text-yellow-200">สรุปรายรับรายจ่าย</Link>
                            </li>
                        </ul>
                    </nav>
                </div>

                {/* Content Area */}
                <div className="p-6">
                    <AppRoutes
                        users={users}
                        setUsers={setUsers}
                        income={income}
                        setIncome={setIncome}
                        expense={expense}
                        setExpense={setExpense}
                    />
                </div>
            </div>
        </Router>
    );
}

export default App;
