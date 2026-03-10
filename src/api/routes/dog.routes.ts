import { Router } from 'express';
import { getDogs, createDog } from '../controllers/dog.controller.js';

const router = Router();

router.get('/', getDogs);
router.post('/', createDog);

export default router;
