import { EntityRepository, Repository } from 'typeorm';
import SurveyUser from '../models/survey_user';

@EntityRepository(SurveyUser)
class SurveyUserRepository extends Repository<SurveyUser> {}

export { SurveyUserRepository };
