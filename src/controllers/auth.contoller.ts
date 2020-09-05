import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import md5 from 'md5';
import { User } from '../models';
import { BaseController } from './base.controller';

export class AuthController extends BaseController<User> {
  private user: User = new User();
  constructor() {
    super(User);
  }
  public async auth(
    request: Request,
    response: Response
  ): Promise<Response<User>> {
    const { email, password } = request.body;
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    const id = user?.id;
    if (!user) {
      return response
        .status(400)
        .json({ auth: false, error: 'User not found' });
    }
    if (md5(password) === user.password) {
      const token = sign({ id }, 'secret', {
        expiresIn: 3600, // expires in 1h
      });
      return response.json({
        auth: true,
        user_id: user.id,
        name: user.name,
        email: user.email,
        token: token,
      });
    } else {
      return response
        .status(400)
        .json({ auth: false, error: 'login ou senha inválidos' });
    }
  }
}
