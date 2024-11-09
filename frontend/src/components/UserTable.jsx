import React, { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function UserTable({ users, deleteUser, toggleActiveStatus }) {
    const [sortOrder, setSortOrder] = useState(true); // true for ascending, false for descending

    const handleSort = (key) => {
        users.sort((a, b) => {
            if (sortOrder) {
                return a[key] > b[key] ? 1 : -1;
            } else {
                return a[key] < b[key] ? 1 : -1;
            }
        });
        setSortOrder(!sortOrder);
    };

    const exportToPDF = () => {
        const input = document.getElementById('user-table');
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 10, 10);
            pdf.save('user-table.pdf');
        });
    };

    const totalUsers = users.length;
    const activeUsers = users.filter(user => user.isActive).length;
    const inactiveUsers = totalUsers - activeUsers;

    return (
        <div className="mt-8 bg-white p-4 rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">Registered Users</h2>
            <p>Total: {totalUsers} | Active: {activeUsers} | Inactive: {inactiveUsers}</p>
            <button onClick={exportToPDF} className="mb-4 bg-blue-500 text-white px-4 py-2 rounded">Export to PDF</button>
            <table id="user-table" className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2 border cursor-pointer" onClick={() => handleSort('name')}>ชื่อ</th>
                        <th className="p-2 border cursor-pointer" onClick={() => handleSort('lastName')}>ฉายา</th>
                        <th className="p-2 border cursor-pointer" onClick={() => handleSort('age')}>อายุ</th>
                        <th className="p-2 border cursor-pointer" onClick={() => handleSort('monasticYears')}>พรรษา</th>
                        <th className="p-2 border cursor-pointer" onClick={() => handleSort('templeAffiliation')}>สังกัดวัด</th>
                        <th className="p-2 border cursor-pointer" onClick={() => handleSort('province')}>จังหวัด</th>
                        <th className="p-2 border cursor-pointer" onClick={() => handleSort('phoneNumber')}>เบอร์</th>
                        <th className="p-2 border cursor-pointer" onClick={() => handleSort('chronicIllness')}>โรคประจำตัว</th>
                        <th className="p-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-100">
                            <td className="p-2 border">{user.name}</td>
                            <td className="p-2 border">{user.lastName}</td>
                            <td className="p-2 border">{user.age}</td>
                            <td className="p-2 border">{user.monasticYears}</td>
                            <td className="p-2 border">{user.templeAffiliation}</td>
                            <td className="p-2 border">{user.province}</td>
                            <td className="p-2 border">{user.phoneNumber}</td>
                            <td className="p-2 border">{user.chronicIllness}</td>
                            <td className="p-2 border">
                                <button 
                                    onClick={() => toggleActiveStatus(user.id)} 
                                    className={`px-2 py-1 rounded mr-2 ${user.isActive ? 'bg-green-500' : 'bg-yellow-500'} text-white`}
                                >
                                    {user.isActive ? 'Deactivate' : 'Activate'}
                                </button>
                                <button onClick={() => deleteUser(user.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserTable;
