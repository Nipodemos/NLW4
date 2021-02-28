import { SurveyUserRepository } from '@repositories/survey_user';
import { Request, Response } from 'express';
import { getCustomRepository, IsNull, Not } from 'typeorm';

export default class NpsController {
  async execute(request: Request, response: Response): Promise<Response> {
    const { survey_id: surveyId } = request.params;
    const surveyUserRepository = getCustomRepository(SurveyUserRepository);

    const surveyUsers = await surveyUserRepository.find({
      surveyId,
      value: Not(IsNull()),
    });
    const detractorsAmount = surveyUsers.filter(
      (item) => item.value >= 0 && item.value <= 6,
    ).length;
    const promotersAmount = surveyUsers.filter(
      (item) => item.value >= 9 && item.value <= 10,
    ).length;
    const passivesAmount = surveyUsers.filter(
      (item) => item.value >= 7 && item.value <= 8,
    ).length;

    const totalAnswers = surveyUsers.length;

    const calculation = Number(
      (((promotersAmount - detractorsAmount) / totalAnswers) * 100).toFixed(2),
    );

    return response.json({
      promotersAmount,
      detractorsAmount,
      totalAnswers,
      passivesAmount,
      nps: calculation,
    });
  }
}
