import { Router } from 'express';
import { AuthController } from '../controllers';
import { RemindController } from '../controllers/remind.controller';
import { RoutesModel } from '../models';
import { UsersController } from './../controllers/users.controller';

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
  public remindController: RemindController = new RemindController();
  public usersController: UsersController = new UsersController();
  public routesModel: RoutesModel = new RoutesModel();
  constructor() {}
  public init(): Router {
    this.routes();
    return this.router;
  }
  public routes(): Router {
    this.router
      .route(`${this.routesModel.version}/authentication`)
      .post(this.authController.auth);

    /**
     * @apiName Auth Controller
     * @description Validate false
     * @method POST
     * @body no body
     * @authotization true
     * @headers no headers
     * @return object validation
     */
    this.router
      .route(`${this.routesModel.version}/validatetoken`)
      .post(this.authController.validateToken);

    /**
     * @apiName Auth Controller
     * @description Register
     * @method POST
     * @body no body
     * @authotization false
     * @headers no headers
     * @return object validation
     */
    this.router
      .route(`${this.routesModel.version}/register`)
      .post(this.authController.register.bind(this.usersController));

    /**
     * @apiName Remind Controller
     * @description Remind
     * @method POST
     * @body no body
     * @authotization true
     * @headers no headers
     * @return object validation
     */
    this.router
      .route(`${this.routesModel.version}/remind`)
      .post(this.remindController.resetPassword.bind(this.remindController));
    return this.router;
  }
}
