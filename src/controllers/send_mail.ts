import { Request, Response } from 'express';
import { SurveyRepository } from '@repositories/survey';
import { SurveyUserRepository } from '@repositories/survey_user';
import { UserRepository } from '@repositories/user';
import { getCustomRepository } from 'typeorm';
import { resolve } from 'path';
import SendMailService from 'src/services/send_mail';

class SendMailController {
  async execute(request: Request, response: Response): Promise<Response> {
    const { email, survey_id: surveyId } = request.body;

    const userRepository = getCustomRepository(UserRepository);
    const surveyRepository = getCustomRepository(SurveyRepository);
    const surveyUserRepository = getCustomRepository(SurveyUserRepository);

    const user = await userRepository.findOne({ email });

    if (!user) {
      return response.status(400).json({ error: 'User does not exist' });
    }

    const survey = await surveyRepository.findOne({ id: surveyId });

    if (!survey) {
      return response.status(400).json({ error: 'User does not exists' });
    }

    let surveyUser = await surveyUserRepository.findOne({
      where: [{ userId: user.id }, { value: null }],
      relations: ['user', 'survey '],
    });

    if (!surveyUser) {
      surveyUser = surveyUserRepository.create({
        userId: user.id,
        surveyId,
      });
      await surveyUserRepository.save(surveyUser);
    }

    const npsPath = resolve(__dirname, '..', 'views', 'emails', 'nps_mail.hbs');

    const variables = {
      name: user.name,
      title: survey.title,
      description: survey.description,
      user_id: user.id,
      link: process.env.URL_MAIL,
    };

    await SendMailService.execute(email, survey.title, variables, npsPath);
    return response.json(surveyUser);
  }
}

export default SendMailController;
