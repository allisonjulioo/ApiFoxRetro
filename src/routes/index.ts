import { Router } from 'express';
import {
  AuthController,
  BoardsController,
  CardsController,
  ColumnsController,
  TeamsController,
  UsersController,
} from '../controllers/';
import { RoutesModel } from './../models/';

export class Routes {
  private router: Router;
  public authController: AuthController = new AuthController();
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
    this.routes();
    return this.router;
  }

  private routes(): Router {
    // authorization
    this.router
      .route(`${this.routesModel.version}/users/auth`)
      .post(this.authController.auth);
    // boards
    this.router
      .route(`${this.routesModel.version}/users/:user_id/boards`)
      .get(this.boardsController.findBoardsByUserId);
    return this.router;
  }
}
