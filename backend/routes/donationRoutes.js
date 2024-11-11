import { Router } from 'express';
import * as donationController from '../controllers/donationController.js';

const router = Router();

// เส้นทางสำหรับการดึงรายรับทั้งหมด
router.get('/', donationController.getDonations);

// เส้นทางสำหรับการเพิ่มรายรับ
router.post('/', donationController.addDonation);



export default router;
