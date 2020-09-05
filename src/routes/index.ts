import { Router } from 'express';
import { BoardsController } from '../controllers/Boards';
import { CardsController } from '../controllers/Cards';
import { ColumnsController } from '../controllers/Columns';
import { TeamsController } from '../controllers/Teams';
import { UsersController } from './../controllers/Users/index';
import { RoutesModel } from './../models/Routes/index';

export class Routes {
  private router: Router;
  public usersController: UsersController = new UsersController();
  public boardsController: BoardsController = new BoardsController();
  public cardsConstroller: CardsController = new CardsController();
  public columnsController: ColumnsController = new ColumnsController();
  public teamsController: TeamsController = new TeamsController();
  private routesModel: RoutesModel = new RoutesModel();

  constructor() {
    this.router = Router();
  }
  public init(): Router {
    this.router = this.routesModel.getDefaultRoutes();
    this.customRoutes();
    return this.router;
  }

  private customRoutes(): Router {
    // boards
    this.router
      .route(`${this.routesModel.version}/users/:user_id/boards`)
      .get(this.boardsController.findBoardsByUserId);
    return this.router;
  }
}
