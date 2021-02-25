import { Router } from 'express';
import surveyRouter from './surveys';
import userRouter from './users';

const router = Router();

router.use('/users', userRouter);
router.use('/surveys', surveyRouter);
export default router;
