import { Router } from "express";
import userRoutes from "./user.routes";
import categoriesRoutes from "./categories.routes";
import questionsRoutes from "./question.routes";
import userController from "../controllers/user.controller";

const router = Router();

router.use('/api/user', userRoutes);
router.use('/api/category', categoriesRoutes);
router.use('/api/question', questionsRoutes);

// only for email varification
router.get('/account/confirmation/:token', userController.verifyEmail);

export default router;