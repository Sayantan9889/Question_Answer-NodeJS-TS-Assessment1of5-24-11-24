import { Router } from 'express';
import userController from '../controllers/user.controller';
import upload from '../helpers/imageUpload.helper';
import { auth } from '../middlewares/auth.middleware';
const route = Router();

route.post('/register/user', upload.single('image'), userController.createUser);
route.get('/account/confirmation/:token', userController.verifyEmail);
route.post('/login/user', userController.loginUser);
route.get('/fetch/user/:id', auth,userController.getUserProfile);
route.put('/update/user/:id', auth, upload.single('image'), userController.updateUserProfile);

export default route;