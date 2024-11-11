import { useState } from 'react';
import { Tabs, Table, Pagination } from 'antd';

const { TabPane } = Tabs;

const Summary = ({ income, expense }) => {
  // คำนวณคงเหลือ
  const totalIncome = income.reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = expense.reduce((acc, curr) => acc + curr.amount, 0);
  const balance = totalIncome - totalExpense;

  // ฟังก์ชันแปลงวันที่และเวลาให้เป็นรูปแบบที่อ่านง่าย
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false };
    return new Date(date).toLocaleString('th-TH', options); // ภาษาไทย
  };

  // สถานะของ Pagination สำหรับรายรับและรายจ่าย
  const [currentIncomePage, setCurrentIncomePage] = useState(1);
  const [currentExpensePage, setCurrentExpensePage] = useState(1);
  const itemsPerPage = 10; // จำนวนรายการที่จะแสดงในแต่ละหน้า

  // คำนวณตำแหน่งของข้อมูลที่จะแสดงในแต่ละหน้า
  const indexOfLastIncome = currentIncomePage * itemsPerPage;
  const indexOfFirstIncome = indexOfLastIncome - itemsPerPage;
  const currentIncome = income.slice(indexOfFirstIncome, indexOfLastIncome);

  const indexOfLastExpense = currentExpensePage * itemsPerPage;
  const indexOfFirstExpense = indexOfLastExpense - itemsPerPage;
  const currentExpense = expense.slice(indexOfFirstExpense, indexOfLastExpense);

  // Columns สำหรับ Table
  const incomeColumns = [
    { title: 'วันที่', dataIndex: 'date', key: 'date', render: (date) => formatDate(date) },
    { title: 'จำนวนเงิน', dataIndex: 'amount', key: 'amount', render: (amount) => `${amount} บาท` },
    { title: 'รายละเอียด', dataIndex: 'description', key: 'description' }
  ];

  const expenseColumns = [
    { title: 'วันที่', dataIndex: 'date', key: 'date', render: (date) => formatDate(date) },
    { title: 'จำนวนเงิน', dataIndex: 'amount', key: 'amount', render: (amount) => `${amount} บาท` },
    { title: 'รายละเอียด', dataIndex: 'description', key: 'description' }
  ];

  const items = [
    {
      key: '1',
      label: 'รายการรายรับ',
      children: (
        <>
          <Table
            columns={incomeColumns}
            dataSource={currentIncome}
            pagination={false}
            rowKey="id"
          />
          <Pagination
            current={currentIncomePage}
            total={income.length}
            pageSize={itemsPerPage}
            onChange={(page) => setCurrentIncomePage(page)}
            showSizeChanger={false}
          />
        </>
      ),
    },
    {
      key: '2',
      label: 'รายการรายจ่าย',
      children: (
        <>
          <Table
            columns={expenseColumns}
            dataSource={currentExpense}
            pagination={false}
            rowKey="id"
          />
          <Pagination
            current={currentExpensePage}
            total={expense.length}
            pageSize={itemsPerPage}
            onChange={(page) => setCurrentExpensePage(page)}
            showSizeChanger={false}
          />
        </>
      ),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">สรุปรายรับรายจ่าย</h2>

      {/* รายรับ - รายจ่าย */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        {/* Total Income */}
        <div className="bg-green-100 p-4 rounded-lg text-center">
          <h3 className="text-xl font-semibold text-green-600">รายรับ</h3>
          <p className="text-2xl text-green-800">{totalIncome} บาท</p>
        </div>

        {/* Total Expense */}
        <div className="bg-red-100 p-4 rounded-lg text-center">
          <h3 className="text-xl font-semibold text-red-600">รายจ่าย</h3>
          <p className="text-2xl text-red-800">{totalExpense} บาท</p>
        </div>
      </div>

      {/* ยอดคงเหลือ */}
      <div className="bg-blue-100 p-4 rounded-lg text-center mb-6">
        <h3 className="text-xl font-semibold text-blue-600">ยอดคงเหลือ</h3>
        <p className="text-2xl text-blue-800">{balance} บาท</p>
      </div>

      {/* Tab Component */}
      <Tabs
        defaultActiveKey="1"
        centered
        items={items}
        className="sm:text-sm lg:text-base" // ปรับขนาดข้อความตามขนาดหน้าจอ
      />
    </div>
  );
};

export default Summary;
