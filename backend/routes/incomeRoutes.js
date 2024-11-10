import { Router } from 'express';
import * as incomeController from '../controllers/incomeController.js';

const router = Router();

// เส้นทางสำหรับการดึงรายรับทั้งหมด
router.get('/', incomeController.getIncomes);

// เส้นทางสำหรับการเพิ่มรายรับ
router.post('/', incomeController.addIncome);

export default router;
