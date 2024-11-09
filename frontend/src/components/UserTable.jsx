import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useState } from 'react';

function UserTable({ users, deleteUser }) {
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

    return (
        <div className="mt-8 bg-white p-4 rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">Registered Users</h2>
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
                    {users.map((user, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                            <td className="p-2 border">{user.name}</td>
                            <td className="p-2 border">{user.lastName}</td>
                            <td className="p-2 border">{user.age}</td>
                            <td className="p-2 border">{user.monasticYears}</td>
                            <td className="p-2 border">{user.templeAffiliation}</td>
                            <td className="p-2 border">{user.province}</td>
                            <td className="p-2 border">{user.phoneNumber}</td>
                            <td className="p-2 border">{user.chronicIllness}</td>
                            <td className="p-2 border">
                                <button className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                                <button onClick={() => deleteUser(index)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserTable;
