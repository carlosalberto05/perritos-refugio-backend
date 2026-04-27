import { Router } from 'express';
import { getDogs, createDog } from '../controllers/dog.controller.js';
import { validateRequest } from '../middlewares/validation.middleware.js';
import { createDogSchema } from '../validations/dog.schema.js';

const router = Router();

router.get('/', getDogs);
router.post('/', validateRequest(createDogSchema), createDog);

export default router;
