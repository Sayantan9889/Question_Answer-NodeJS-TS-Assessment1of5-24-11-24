import { Router } from "express";
import userRoutes from "./user.routes";

const router = Router();

router.use('api', userRoutes);

export default router;