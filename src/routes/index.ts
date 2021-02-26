import { Router } from 'express';
import surveyRouter from './surveys';
import userRouter from './users';
import sendMailRouter from './send_mail';

const router = Router();

router.use('/users', userRouter);
router.use('/surveys', surveyRouter);
router.use('/send_mail', sendMailRouter);
export default router;
