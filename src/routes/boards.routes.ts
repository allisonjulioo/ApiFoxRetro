import { Router } from 'express';
import { BoardsController } from '../controllers';
import { RoutesModel } from '../models';

/**
 * @apiName Boards Controller
 * @description
 * @method GET
 * @body no body
 * @authotization true
 * @headers { token: string: uid: number }
 * @return boards data
 */
export class BoardsRoutes {
  public router: Router = Router();
  public boardsController: BoardsController = new BoardsController();
  public routesModel: RoutesModel = new RoutesModel();
  constructor() {}
  public init(): Router {
    this.routes();
    return this.router;
  }
  public routes(): Router {
    this.router
      .route(`${this.routesModel.version}/boards`)
      .get(this.boardsController.getBoardsByUserId.bind(this.boardsController));
    this.router
      .route(`${this.routesModel.version}/get-all-boards/search`)
      .post(this.boardsController.search.bind(this.boardsController));
    return this.router;
  }
}
