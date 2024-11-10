import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FaSort } from 'react-icons/fa';

function UserTable({ users, deleteUser, toggleActiveStatus, toggleSetdownStatus }) {
    const [sortOrder, setSortOrder] = useState(true); // true for ascending, false for descending
    const [currentPage, setCurrentPage] = useState(1);
    const [sortedUsers, setSortedUsers] = useState(users); // ใช้ sortedUsers เพื่อเก็บข้อมูลที่ถูกเรียงแล้ว
    const usersPerPage = 10;

    useEffect(() => {
        setSortedUsers(users); // เมื่อ component mount, กำหนด sortedUsers ให้เป็น users เริ่มต้น
    }, [users]);

    const handleSort = (key) => {
        const sorted = [...users].sort((a, b) => {
            // แปลงค่าให้เป็นตัวเลขก่อนทำการเปรียบเทียบ ถ้าเป็นตัวเลข
            const aValue = typeof a[key] === 'number' ? a[key] : parseFloat(a[key]);
            const bValue = typeof b[key] === 'number' ? b[key] : parseFloat(b[key]);
    
            if (!isNaN(aValue) && !isNaN(bValue)) {
                return sortOrder ? aValue - bValue : bValue - aValue;
            } else {
                // ถ้าค่าที่เปรียบเทียบไม่ใช่ตัวเลข ให้เปรียบเทียบตามตัวอักษร
                return sortOrder ? a[key].localeCompare(b[key]) : b[key].localeCompare(a[key]);
            }
        });
    
        setSortedUsers(sorted); // อัพเดต sortedUsers
        setSortOrder(!sortOrder); // สลับการเรียง
        setCurrentPage(1); // รีเซ็ตหน้าเมื่อมีการเรียง
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

    // Pagination logic
    const totalPages = Math.ceil(sortedUsers.length / usersPerPage);
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const totalUsers = users.length;
    const activeUsers = users.filter(user => user.isActive).length;
    const inactiveUsers = totalUsers - activeUsers;
    const setDownUsers = users.filter(user => user.IsSetdown).length;
    const inSetDownUsers = totalUsers - setDownUsers;

    return (
        <div className="mt-8 bg-white p-4 rounded shadow-md overflow-x-auto">
            <h2 className="text-xl font-bold mb-4 text-center">รายชื่อพระปริวาสกรรม</h2>
            <p className="flex justify-center items-center text-xl mb-4">จำนวนพระปริวาสทั้งหมด: {totalUsers} | จำนวนที่สวดแล้ว: {activeUsers} | จำนวนที่ยังไม่ได้สวด: {inactiveUsers}</p>
            <p className="flex justify-center items-center text-xl mb-4">จำนวนที่จัดที่นั่งแล้ว: {setDownUsers} | จำนวนที่ยังไม่ได้จัดที่นั่ง: {inSetDownUsers}</p>
            
            <table id="user-table" className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2 border">NO.</th>
                        <th className="p-2 border cursor-pointer" onClick={() => handleSort('name')}>ชื่อ <FaSort className="inline-block ml-1" /></th>
                        <th className="p-2 border cursor-pointer" onClick={() => handleSort('lastName')}>ฉายา <FaSort className="inline-block ml-1" /></th>
                        <th className="p-2 border cursor-pointer" onClick={() => handleSort('age')}>อายุ <FaSort className="inline-block ml-1" /></th>
                        <th className="p-2 border cursor-pointer" onClick={() => handleSort('monasticYears')}>พรรษา <FaSort className="inline-block ml-1" /></th>
                        <th className="p-2 border cursor-pointer" onClick={() => handleSort('templeAffiliation')}>สังกัดวัด <FaSort className="inline-block ml-1" /></th>
                        <th className="p-2 border cursor-pointer" onClick={() => handleSort('province')}>จังหวัด <FaSort className="inline-block ml-1" /></th>
                        <th className="p-2 border cursor-pointer" onClick={() => handleSort('phoneNumber')}>เบอร์ <FaSort className="inline-block ml-1" /></th>
                        <th className="p-2 border cursor-pointer" onClick={() => handleSort('chronicIllness')}>โรคประจำตัว <FaSort className="inline-block ml-1" /></th>
                        <th className="p-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.map((user, index) => (
                        <tr key={user.id} className="hover:bg-gray-100">
                            <td className="p-2 border">{indexOfFirstUser + index + 1}</td>
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
                                    {user.isActive ? 'สวดแล้ว' : 'ยังไม่ได้สวด'}
                                </button>
                                <button
                                    onClick={() => toggleSetdownStatus(user.id)}
                                    className={`px-2 py-1 rounded mr-2 ${user.IsSetdown ? 'bg-green-200' : 'bg-yellow-200'} text-black`}
                                >
                                    {user.IsSetdown ? 'จัดที่นั่งแล้ว' : 'ยังไม่ได้จัดที่นั่ง'}
                                </button>
                                <button onClick={() => deleteUser(user.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-between mt-4">
                <button 
                    onClick={handlePrevPage} 
                    disabled={currentPage === 1} 
                    className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button 
                    onClick={handleNextPage} 
                    disabled={currentPage === totalPages} 
                    className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
            <button onClick={exportToPDF} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Export to PDF</button>
        </div>
    );
}

export default UserTable;
