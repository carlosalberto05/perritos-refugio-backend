import { Router } from 'express';
import { getShelters } from '../controllers/shelter.controller.js';

const router = Router();
router.get('/', getShelters);

export default router;
