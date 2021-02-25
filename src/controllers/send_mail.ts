import { Request, Response } from 'express';
import Survey from 'models/survey';
import SurveyUser from 'models/survey_user';
import User from 'models/user';
import { getCustomRepository } from 'typeorm';

class SendMailController {
  async execute(request: Request, response: Response) {
    const { email, survey_id: surveyId } = request.body;

    const userRepository = getCustomRepository(User);
    const surveyRepository = getCustomRepository(Survey);
    const surveyUserRepository = getCustomRepository(SurveyUser);
  }
}

export default SendMailController;
