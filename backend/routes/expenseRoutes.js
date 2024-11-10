import { Router } from 'express';
import * as expenseController from '../controllers/expenseController.js';

const router = Router();

// เส้นทางสำหรับการดึงรายจ่ายทั้งหมด
router.get('/', expenseController.getExpenses);

// เส้นทางสำหรับการเพิ่มรายจ่าย
router.post('/', expenseController.addExpense);

export default router;
