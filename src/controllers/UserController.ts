import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../models/user';

class UserController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;
    const userRepository = getRepository(User);

    const userAlreadyExists = await userRepository.count({ email });
    console.log('userAlreadyExists :>> ', userAlreadyExists);
    if (userAlreadyExists > 0) {
      return response.status(400).json({ error: 'user already exists' });
    }
    const user = userRepository.create({ name, email });
    await userRepository.save(user);
    return response.json(user);
  }
}

export default UserController;
