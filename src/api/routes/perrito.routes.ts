import { Router } from 'express';
import {
  getPerritos,
  createPerrito,
} from '../controllers/perrito.controller.js';

const router = Router();

router.get('/', getPerritos);
router.post('/', createPerrito);

export default router;
