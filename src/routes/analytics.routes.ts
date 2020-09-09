import { Router } from 'express';
import { AnalyticsController } from '../controllers';
import { RoutesModel } from '../models';

/**
 * @apiName Analytics Controller
 * @description
 * @method GET
 * @body no body
 * @authotization true
 * @headers { token: string: uid: number }
 * @return Analytics data
 */
export class AnalyticsRoutes {
  public router: Router = Router();
  public analyticsController: AnalyticsController = new AnalyticsController();
  public routesModel: RoutesModel = new RoutesModel();
  constructor() {}
  public init(): Router {
    this.routes();
    return this.router;
  }
  public routes(): Router {
    this.router
      .route(`${this.routesModel.version}/analytics/get-lines`)
      .get(this.analyticsController.getLines.bind(this.analyticsController));
    this.router
      .route(`${this.routesModel.version}/analytics/get-cloud-words`)
      .get(
        this.analyticsController.getCloudWords.bind(this.analyticsController)
      );
    return this.router;
  }
}
