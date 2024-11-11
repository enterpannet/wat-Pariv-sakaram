import { useState, useEffect } from 'react';
import { Tabs, Table, Pagination } from 'antd';
import axios from 'axios';

const DonationSummary = () => {
  const [donations, setDonations] = useState([]);
  const [itemDonations, setItemDonations] = useState([]);
  const [moneyDonations, setMoneyDonations] = useState([]);
  const [dailyMoneyTotals, setDailyMoneyTotals] = useState({});
  const [currentPageItems, setCurrentPageItems] = useState(1);
  const [currentPageMoney, setCurrentPageMoney] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/donations`);
        const sortedData = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setDonations(sortedData);
        setItemDonations(sortedData.filter((donation) => donation.items));
        setMoneyDonations(sortedData.filter((donation) => donation.amount));

        calculateDailyTotals(sortedData);
      } catch (error) {
        console.error("Error fetching donations:", error);
      }
    };
    fetchDonations();
  }, []);

  const calculateDailyTotals = (data) => {
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    const dailyTotals = {};

    data
      .filter(donation => donation.amount && new Date(donation.createdAt) >= threeDaysAgo)
      .forEach(donation => {
        const dateKey = formatDateThai(donation.createdAt).split(' ')[0]; // Group by date only
        if (!dailyTotals[dateKey]) {
          dailyTotals[dateKey] = 0;
        }
        dailyTotals[dateKey] += donation.amount;
      });

    setDailyMoneyTotals(dailyTotals);
  };

  const formatDateThai = (date) => {
    return new Date(date).toLocaleString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    });
  };

  const itemColumns = [
    { title: 'วันที่บริจาค', dataIndex: 'createdAt', key: 'createdAt', render: (date) => formatDateThai(date) },
    { title: 'ชื่อผู้บริจาค', dataIndex: 'donorName', key: 'donorName' },
    { title: 'ที่อยู่', dataIndex: 'address', key: 'address' },
    { title: 'สิ่งของที่บริจาค', dataIndex: 'items', key: 'items' },
  ];

  const moneyColumns = [
    { title: 'วันที่บริจาค', dataIndex: 'createdAt', key: 'createdAt', render: (date) => formatDateThai(date) },
    { title: 'ชื่อผู้บริจาค', dataIndex: 'donorName', key: 'donorName' },
    { title: 'ที่อยู่', dataIndex: 'address', key: 'address' },
    { title: 'จำนวนเงินที่บริจาค (บาท)', dataIndex: 'amount', key: 'amount' },
  ];

  const itemsTab = (
    <>
      <Table columns={itemColumns} dataSource={itemDonations.slice((currentPageItems - 1) * itemsPerPage, currentPageItems * itemsPerPage)} pagination={false} rowKey="id" />
      <Pagination
        current={currentPageItems}
        total={itemDonations.length}
        pageSize={itemsPerPage}
        onChange={(page) => setCurrentPageItems(page)}
        showSizeChanger={false}
        className="mt-4 text-center"
      />
    </>
  );

  const moneyTab = (
    <>
      <Table columns={moneyColumns} dataSource={moneyDonations.slice((currentPageMoney - 1) * itemsPerPage, currentPageMoney * itemsPerPage)} pagination={false} rowKey="id" />
      <Pagination
        current={currentPageMoney}
        total={moneyDonations.length}
        pageSize={itemsPerPage}
        onChange={(page) => setCurrentPageMoney(page)}
        showSizeChanger={false}
        className="mt-4 text-center"
      />
    </>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center text-gray-700 mb-2">สรุปการบริจาค</h2>
      <div className="text-center text-lg font-semibold text-gray-600 mb-6">
        <p>ยอดบริจาคเงินย้อนหลัง 3 วัน</p>
        {Object.entries(dailyMoneyTotals).map(([date, total]) => (
          <p key={date}>{date}: {total.toLocaleString('th-TH')} บาท</p>
        ))}
      </div>
      <Tabs defaultActiveKey="1" centered className="sm:text-sm lg:text-base">
        <Tabs.TabPane tab="สิ่งของที่บริจาค" key="1">
          {itemsTab}
        </Tabs.TabPane>
        <Tabs.TabPane tab="เงินที่บริจาค" key="2">
          {moneyTab}
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default DonationSummary;
