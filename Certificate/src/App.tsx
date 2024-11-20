import React, { useRef, useState } from 'react';
import Form from './components/Form';
import Certificate from './components/Certificate';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './components/css/certificate.css';

const App: React.FC = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const certificateRef = useRef<HTMLDivElement>(null);

  const handleFormSubmit = (name: string, date: string) => {
    setName(name);
    setDate(date);
  };

  const handleDownloadPDF = async () => {
    if (certificateRef.current) {
      const canvas = await html2canvas(certificateRef.current, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'pt',
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save('certificate.pdf');
    } else {
      console.error('Certificate reference is null');
    }
  };

  return (
    <div className="App">
      <Form onSubmit={handleFormSubmit} />
      {name && date && (
        <div>
          <div ref={certificateRef}>
            <Certificate name={name} date={date} />
          </div>
          <button onClick={handleDownloadPDF}>ดาวน์โหลด PDF</button>
        </div>
      )}
    </div>
  );
};

export default App;
