import { Router } from 'express';
import multer from 'multer';
import * as userController from '../controllers/user.controller';
import * as questionController from '../controllers/questions.controller';
import { auth } from '../middlewares/auth.middleware';

const router = Router();

// Question routes
router.get('/categories/:categoryId/questions', auth, questionController.getQuestionsByCategory);
router.post('/questions/:questionId/answers', auth, questionController.submitAnswer);
router.get('/questions/search', auth, questionController.searchQuestions);
router.get('/categories', auth, questionController.getCategoriesWithCount);