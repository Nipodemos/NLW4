import { Request, Response } from 'express';
import AppError from 'src/errors/app_errors';
import { getCustomRepository } from 'typeorm';
import * as yup from 'yup';
import { UserRepository } from '../repositories/user';

class UserController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;

    const schema = yup.object().shape({
      name: yup.string().required('Nome obrigatório'),
      email: yup.string().email('Email inválido'),
    });

    try {
      await schema.validate(request.body, { abortEarly: false });
    } catch (error) {
      throw new AppError(error);
    }
    const userRepository = getCustomRepository(UserRepository);

    const userAlreadyExists = await userRepository.count({ email });
    if (userAlreadyExists > 0) {
      throw new AppError('User does not exist!');
    }
    const user = userRepository.create({ name, email });
    await userRepository.save(user);
    return response.status(201).json(user);
  }

  async showAll(request: Request, response: Response): Promise<Response> {
    const userRepository = getCustomRepository(UserRepository);
    const allUsers = await userRepository.find();

    if (!allUsers) {
      return response.status(204).json([]);
    }

    return response.json(allUsers);
  }
}

export default UserController;
