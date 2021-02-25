import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/user';

class UserController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;
    const userRepository = getCustomRepository(UserRepository);

    const userAlreadyExists = await userRepository.count({ email });
    if (userAlreadyExists > 0) {
      return response.status(400).json({ error: 'user already exists' });
    }
    const user = userRepository.create({ name, email });
    await userRepository.save(user);
    return response.status(201).json(user);
  }
}

export default UserController;
