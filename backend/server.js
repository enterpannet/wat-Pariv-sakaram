import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import incomeRoutes from './routes/incomeRoutes.js';
import expenseRoutes from './routes/expenseRoutes.js';
dotenv.config();

const app = express();

app.use(cors({
    origin: ['http://210.246.215.231', 'http://localhost:3000','https://www.wnkn.org','https://wnkn.org']
}));
app.use(bodyParser.json());

// เพิ่ม route สำหรับ '/'
app.get('/', (req, res) => {
    res.send('สวัสดี');
});
app.use('/api/income', incomeRoutes);  // เส้นทางสำหรับ income
app.use('/api', expenseRoutes);
app.use('/api/v1', userRoutes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
