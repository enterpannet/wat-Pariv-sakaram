// src/App.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="bg-gray-100">
      <div className="bg-blue-600 text-white p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">วัดหนองขนาก</h2>
          <button
            className="lg:hidden text-white"
            onClick={handleMenuClick}
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

        <nav>
          <ul
            className={`${
              isMenuOpen ? 'block' : 'hidden'
            } lg:flex lg:space-x-4 mt-4 lg:mt-0`}
          >
            <li>
              <Link to="/" className="text-white hover:text-yellow-200" onClick={closeMenu}>
                หน้าแรก
              </Link>
            </li>
            <li>
              <Link to="/register" className="text-white hover:text-yellow-200" onClick={closeMenu}>
                ลงทะเบียนพระปริวาส
              </Link>
            </li>
            <li>
              <Link to="/view" className="text-white hover:text-yellow-200" onClick={closeMenu}>
                ตารางรายชื่อพระ
              </Link>
            </li>
            <li>
              <Link to="/income" className="text-white hover:text-yellow-200" onClick={closeMenu}>
                บันทึกรายรับ
              </Link>
            </li>
            <li>
              <Link to="/expense" className="text-white hover:text-yellow-200" onClick={closeMenu}>
                บันทึกรายจ่าย
              </Link>
            </li>
            <li>
              <Link to="/summary" className="text-white hover:text-yellow-200" onClick={closeMenu}>
                สรุปรายรับรายจ่าย
              </Link>
            </li>
            <li>
              <Link to="/donation" className="text-white hover:text-yellow-200" onClick={closeMenu}>
                บริจาค
              </Link>
            </li>
            <li>
              <Link to="/summarydonation" className="text-white hover:text-yellow-200" onClick={closeMenu}>
                สรุปบริจาค
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
