import { Router } from 'express';
import SurveyController from '../controllers/survey';

const surveyRouter = Router();

const surveyController = new SurveyController();
surveyRouter.post('/', surveyController.create);
surveyRouter.get('/', surveyController.show);

export default surveyRouter;
