import { Router } from 'express';
import categoriesController from '../controllers/categories.controller';
import { auth } from '../middlewares/auth.middleware';

const router = Router()


router.post('/create', auth, categoriesController.createCategory);


export default router;
