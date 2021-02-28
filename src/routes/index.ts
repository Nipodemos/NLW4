import { Router } from 'express';
import surveyRouter from './surveys';
import userRouter from './users';
import sendMailRouter from './send_mail';
import answerRouter from './answer';
import npsRouter from './nps';

const router = Router();

router.use('/users', userRouter);
router.use('/surveys', surveyRouter);
router.use('/send_mail', sendMailRouter);
router.use('/answers', answerRouter);
router.use('/nps', npsRouter);

export default router;
