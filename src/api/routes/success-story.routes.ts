import { Router } from 'express';
import { getSuccessStories } from '../controllers/success-story.controller.js';

const router = Router();
router.get('/', getSuccessStories);

export default router;
