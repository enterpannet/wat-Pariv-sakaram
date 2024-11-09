import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();

app.use(cors({
    origin: 'http://localhost' // URL ของ frontend
}));
app.use(bodyParser.json());

// เพิ่ม route สำหรับ '/'
app.get('/', (req, res) => {
    res.send('สวัสดี');
});

app.use('/api/v1', userRoutes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
