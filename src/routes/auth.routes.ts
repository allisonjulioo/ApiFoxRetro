import { Router } from 'express';
import { AuthController } from '../controllers';
import { RoutesModel } from '../models';

/**
 * @apiName Auth Controller
 * @description Authorization
 * @method POST
 * @body { email: string, password: string }
 * @return user data - token
 */

export class AuthRoutes {
  public router: Router = Router();
  public authController: AuthController = new AuthController();
  public routesModel: RoutesModel = new RoutesModel();
  constructor() {}
  public init(): Router {
    this.routes();
    return this.router;
  }
  public routes(): Router {
    this.router
      .route(`${this.routesModel.version}/users/auth`)
      .post(this.authController.auth);

    /**
     * @apiName Auth Controller
     * @description Validate token
     * @method POST
     * @body no body
     * @authotization true
     * @headers { token: string: uid: number }
     * @return object validation
     */
    this.router
      .route(`${this.routesModel.version}/validatetoken`)
      .post(this.authController.validateToken);
    return this.router;
  }
}
