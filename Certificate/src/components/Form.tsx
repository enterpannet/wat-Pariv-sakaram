import React, { useState } from 'react';

interface FormProps {
  onSubmit: (name: string, date: string) => void;
}

const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(name, date);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        ชื่อผู้รับ:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="กรอกชื่อ"
          required
        />
      </label>
      <label>
        วันที่:
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </label>
      <button type="submit">สร้างเกียรติบัตร</button>
    </form>
  );
};

export default Form;
