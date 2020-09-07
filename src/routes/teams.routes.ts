import { Router } from 'express';
import { TeamsController } from '../controllers';
import { RoutesModel } from '../models';

/**
 * @apiName Teams Controller
 * @description
 * @method GET
 * @body no body
 * @authotization true
 * @headers { token: string: uid: number }
 * @return teams data
 */
export class TeamsRoutes {
  public router: Router = Router();
  public teamsController: TeamsController = new TeamsController();
  public routesModel: RoutesModel = new RoutesModel();
  constructor() {}
  public init(): Router {
    this.routes();
    return this.router;
  }
  public routes(): Router {
    this.router
      .route(`${this.routesModel.version}/teams`)
      .get(this.teamsController.getTeamsByUserId.bind(this.teamsController));
    this.router
      .route(`${this.routesModel.version}/get-all-teams/search`)
      .post(this.teamsController.search.bind(this.teamsController));
    return this.router;
  }
}
