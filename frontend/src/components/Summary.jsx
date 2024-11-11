import { useState, useEffect } from 'react';
import { Tabs, Table, Pagination, Button, Modal, Input } from 'antd';
import axios from 'axios';

const Summary = () => {
  const [income, setIncome] = useState([]);
  const [expense, setExpense] = useState([]);
  const [currentIncomePage, setCurrentIncomePage] = useState(1);
  const [currentExpensePage, setCurrentExpensePage] = useState(1);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [editingAmount, setEditingAmount] = useState(0);
  const [editingDescription, setEditingDescription] = useState('');
  const itemsPerPage = 9;

  useEffect(() => {
    fetchIncome();
    fetchExpense();
  }, []);

  const fetchIncome = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/income`);
      setIncome(response.data);
    } catch (error) {
      console.error("Error fetching income:", error);
    }
  };

  const fetchExpense = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/expenses`);
      setExpense(response.data);
    } catch (error) {
      console.error("Error fetching expense:", error);
    }
  };

  const totalIncome = income.reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = expense.reduce((acc, curr) => acc + curr.amount, 0);
  const balance = totalIncome - totalExpense;

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false };
    return new Date(date).toLocaleString('th-TH', options);
  };

  const showEditModal = (record) => {
    setEditingRecord(record);
    setEditingAmount(record.amount);
    setEditingDescription(record.description);
    setIsEditModalVisible(true);
  };

  const handleEdit = async () => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/${editingRecord.type}/${editingRecord.id}`, {
        amount: editingAmount,
        description: editingDescription,
      });
      setIsEditModalVisible(false);
      editingRecord.type === "income" ? fetchIncome() : fetchExpense();
    } catch (error) {
      console.error("Error editing record:", error);
    }
  };

  const handleDeleteIncome = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/income/${id}`);
      setIncome((prevIncome) => prevIncome.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting income:", error);
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/expenses/${id}`);
      setExpense((prevExpense) => prevExpense.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const incomeColumns = [
    { title: 'วันที่', dataIndex: 'date', key: 'date', render: (date) => formatDate(date) },
    { title: 'จำนวนเงิน', dataIndex: 'amount', key: 'amount', render: (amount) => `${amount} บาท` },
    { title: 'รายละเอียด', dataIndex: 'description', key: 'description' },
    {
      title: 'การจัดการ',
      key: 'action',
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => showEditModal({ ...record, type: 'income' })}>แก้ไข</Button>
          <Button type="link" danger onClick={() => handleDeleteIncome(record.id)}>ลบ</Button>
        </>
      ),
    },
  ];

  const expenseColumns = [
    { title: 'วันที่', dataIndex: 'date', key: 'date', render: (date) => formatDate(date) },
    { title: 'จำนวนเงิน', dataIndex: 'amount', key: 'amount', render: (amount) => `${amount} บาท` },
    { title: 'รายละเอียด', dataIndex: 'description', key: 'description' },
    {
      title: 'การจัดการ',
      key: 'action',
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => showEditModal({ ...record, type: 'expenses' })}>แก้ไข</Button>
          <Button type="link" danger onClick={() => handleDeleteExpense(record.id)}>ลบ</Button>
        </>
      ),
    },
  ];

  const currentIncomeData = income.slice((currentIncomePage - 1) * itemsPerPage, currentIncomePage * itemsPerPage);
  const currentExpenseData = expense.slice((currentExpensePage - 1) * itemsPerPage, currentExpensePage * itemsPerPage);

  const items = [
    {
      key: '1',
      label: 'รายการรายรับ',
      children: (
        <>
          <Table columns={incomeColumns} dataSource={currentIncomeData} pagination={false} rowKey="id" />
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
          <Table columns={expenseColumns} dataSource={currentExpenseData} pagination={false} rowKey="id" />
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <div className="bg-green-100 p-4 rounded-lg text-center">
          <h3 className="text-xl font-semibold text-green-600">รายรับ</h3>
          <p className="text-2xl text-green-800">{totalIncome} บาท</p>
        </div>
        <div className="bg-red-100 p-4 rounded-lg text-center">
          <h3 className="text-xl font-semibold text-red-600">รายจ่าย</h3>
          <p className="text-2xl text-red-800">{totalExpense} บาท</p>
        </div>
      </div>
      <div className="bg-blue-100 p-4 rounded-lg text-center mb-6">
        <h3 className="text-xl font-semibold text-blue-600">ยอดคงเหลือ</h3>
        <p className="text-2xl text-blue-800">{balance} บาท</p>
      </div>
      <Tabs defaultActiveKey="1" centered items={items} className="sm:text-sm lg:text-base" />
      <Modal
        title="แก้ไขรายการ"
        visible={isEditModalVisible}
        onOk={handleEdit}
        onCancel={() => setIsEditModalVisible(false)}
      >
        <label>จำนวนเงิน:</label>
        <Input
          type="number"
          value={editingAmount}
          onChange={(e) => setEditingAmount(parseFloat(e.target.value))}
        />
        <label>รายละเอียด:</label>
        <Input
          value={editingDescription}
          onChange={(e) => setEditingDescription(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default Summary;
