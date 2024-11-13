// src/App.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="flex flex-col justify-center items-center mt-5">
     
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <Link to="/" className="nav-button">
          หน้าแรก
        </Link>
        <Link to="/register" className="nav-button">
          ลงทะเบียนพระปริวาส
        </Link>
        <Link to="/view" className="nav-button">
          ตารางรายชื่อพระ
        </Link>
        <Link to="/income" className="nav-button">
          บันทึกรายรับ
        </Link>
        <Link to="/expense" className="nav-button">
          บันทึกรายจ่าย
        </Link>
        <Link to="/summary" className="nav-button">
          สรุปรายรับรายจ่าย
        </Link>
        <Link to="/donation" className="nav-button">
          บริจาค
        </Link>
        <Link to="/summarydonation" className="nav-button">
          สรุปบริจาค
        </Link>
      </div>
    </div>
  );
}

export default App;
