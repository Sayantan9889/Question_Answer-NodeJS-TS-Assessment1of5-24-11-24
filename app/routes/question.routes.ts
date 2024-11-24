import { Router } from 'express';
import multer from 'multer';
import * as userController from '../controllers/user.controller';
import * as questionController from '../controllers/question.controller';
import { auth } from '../middlewares/auth.middleware';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

// User routes
// router.post('/signup', userController.signup);
// router.post('/login', userController.login);
// router.get('/profile', auth, userController.getProfile);
// router.put('/profile', auth, upload.single('profilePicture'), userController.updateProfile);

// Question routes
router.get('/categories/:categoryId/questions', auth, questionController.getQuestionsByCategory);
router.post('/questions/:questionId/answers', auth, questionController.submitAnswer);
router.get('/questions/search', auth, questionController.searchQuestions);
router.get('/categories', auth, questionController.getCategoriesWithCount);