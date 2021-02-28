import { Router } from 'express';
import UserController from '../controllers/user';

const userRouter = Router();

const userController = new UserController();

userRouter.get('/', userController.showAll);
userRouter.post('/', userController.create);

export default userRouter;
