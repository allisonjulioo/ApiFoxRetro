import express, {
  Application,
  NextFunction,
  Request,
  Response,
  Router,
} from 'express';
import { isValidToken } from '../utils/validates/token';
import { RoutesModel } from './../models/';
import { AnalyticsRoutes } from './analytics.routes';
import { AuthRoutes } from './auth.routes';
import { BoardsRoutes } from './boards.routes';
import { ColumnsRoutes } from './columns.routes';
import { TeamsRoutes } from './teams.routes';

export class Routes {
  public router: Router = Router();
  public server: Application = express();
  constructor() {}
  public init(): Router {
    this.server.all(
      '*',
      (request: Request, response: Response, next: NextFunction) => {
        const token = request.headers['x-access-token'];
        const auth =
          request.originalUrl.split('/').includes('auth') ||
          request.originalUrl.split('/').includes('register') ||
          request.originalUrl.split('/').includes('remind');
        if ((token && isValidToken(String(token))) || auth) {
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
    this.routes();
    return this.router;
  }
  private routes(): Router {
    this.router.use(new RoutesModel().routes());
    this.router.use(new AuthRoutes().routes());
    this.router.use(new BoardsRoutes().routes());
    this.router.use(new TeamsRoutes().routes());
    this.router.use(new ColumnsRoutes().routes());
    this.router.use(new AnalyticsRoutes().routes());
    return this.router;
  }
}
