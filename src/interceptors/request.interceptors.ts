import express, { Application, NextFunction, Request, Response } from 'express';
import { isValidToken } from '../utils/validates/token';

export class RequestsInterceptor {
  public server: Application = express();
  public async interceptors(): Promise<any> {
    this.server.all(
      '*',
      (request: Request, response: Response, next: NextFunction) => {
        const token = request.headers['x-access-token'];
        const auth = request.originalUrl.split('/').includes('authentication');
        const register = request.originalUrl.split('/').includes('register');
        if ((token && isValidToken(String(token))) || auth || register) {
          next();
          return;
        } else {
          return response.status(401).json({
            auth: false,
            message: 'Token is not valid',
          });
        }
      }
    );
  }
}
new RequestsInterceptor();
