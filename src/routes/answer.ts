import { Router } from 'express';
import AnswerController from '../controllers/answer';

const answerRouter = Router();

const answerController = new AnswerController();
answerRouter.get('/:value', answerController.execute);

export default answerRouter;
