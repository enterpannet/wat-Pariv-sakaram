import React from 'react';

interface CertificateProps {
  name: string;
  date: string;
}

const Certificate: React.FC<CertificateProps> = ({ name, date }) => {
  return (
    <div className="certificate">
      <h1>ใบอนุโมทนา</h1>
      <p>ขอมอบให้</p>
      <h2>{name}</h2>
      <p>เพื่อแสดงความชื่นชมและอนุโมทนาในความดี</p>
      <p>วันที่: {date}</p>
      <p>ขอแสดงความนับถือ</p>
      <h3>ชื่อองค์กรหรือวัด</h3>
    </div>
  );
};

export default Certificate;
