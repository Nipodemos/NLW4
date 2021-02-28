import { SurveyUserRepository } from '@repositories/survey_user';
import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import AppError from '../errors/app_errors';

export default class AnswerController {
  async execute(request: Request, response: Response): Promise<Response> {
    const { id } = request.query;
    const { value } = request.params;

    const surveyUserRepository = getCustomRepository(SurveyUserRepository);

    const surveyUser = await surveyUserRepository.findOne({ id: String(id) });

    if (!surveyUser) {
      throw new AppError('Survey Users does not exists!');
    }

    surveyUser.value = Number(value);
    await surveyUserRepository.save(surveyUser);

    return response.json(surveyUser);
  }
}
