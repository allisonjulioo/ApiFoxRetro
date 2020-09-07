import { NextFunction, Request, Response } from 'express';
import { sign, verify } from 'jsonwebtoken';
import md5 from 'md5';
import { User } from '../models';
import { BaseController } from './base.controller';

export class AuthController extends BaseController<User> {
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
      const token = sign({ id }, String(process.env.SECRET), {
        expiresIn: 3600, // expires in 1h
      });
      const { name, email, id: user_id, password } = user;
      return response.json({
        auth: true,
        user_id,
        name,
        email,
        token,
      });
    } else {
      return response
        .status(400)
        .json({ auth: false, error: 'login ou senha inválidos' });
    }
  }
  public async validateToken(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response<string>> {
    const token = request.headers['x-access-token'];
    if (!token) {
      return response
        .status(401)
        .json({ auth: false, message: 'No token provided.' });
    }

    verify(String(token), String(process.env.SECRET), (err, decoded: any) => {
      if (err) {
        return response
          .status(401)
          .json({ auth: false, message: 'Failed to authenticate token.' });
      } else {
        request = decoded;
        next();
        return;
      }
    });
    return response.status(200).json({
      auth: true,
      message: 'Token provided.',
      request_user: { ...request, token },
    });
  }
}
