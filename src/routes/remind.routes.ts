import { Router } from 'express';
import { RemindController } from '../controllers/remind.controller';
import { RoutesModel } from '../models';

/**
 * @apiName Mailer Controller
 * @description
 * @method POST
 * @body {email: string}
 * @authotization true
 * @headers { token: string: uid: number }
 * @return remind send data
 */
export class RemindRoutes {
  public router: Router = Router();
  public remindController: RemindController = new RemindController();
  public routesModel: RoutesModel = new RoutesModel();
  constructor() {}

  public routes(): Router {
    this.router
      .route(`${this.routesModel.version}/users/remind`)
      .post(this.remindController.resetPassword.bind(this.remindController));
    return this.router;
  }
}
