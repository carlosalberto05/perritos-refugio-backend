import { Router } from 'express';
import { getRefugios } from '../controllers/refugio.controller.js';

const router = Router();
router.get('/', getRefugios);

export default router;
