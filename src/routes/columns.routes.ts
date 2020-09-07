import { Router } from 'express';
import { ColumnsController } from '../controllers';
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
export class ColumnsRoutes {
  public router: Router = Router();
  public columnsController: ColumnsController = new ColumnsController();
  public routesModel: RoutesModel = new RoutesModel();
  constructor() {}
  public init(): Router {
    this.routes();
    return this.router;
  }
  public routes(): Router {
    /**
     * @apiName Columns Controller
     * @description
     * @method GET
     * @body no body
     * @authotization true
     * @headers { token: string: uid: number }
     * @return teams data
     */
    this.router
      .route(`${this.routesModel.version}/:board_id/get-columns-by-board-id/`)
      .get(
        this.columnsController.getColumnsByBoardId.bind(this.columnsController)
      );
    return this.router;
  }
}
