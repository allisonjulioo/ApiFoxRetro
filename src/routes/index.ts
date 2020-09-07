import express, {
  Application,
  NextFunction,
  Request,
  Response,
  Router,
} from 'express';
import {
  AuthController,
  BoardsController,
  CardsController,
  ColumnsController,
  TeamsController,
  UsersController,
} from '../controllers/';
import { isValidToken } from '../utils/validates/token';
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
  public server: Application = express();
  constructor() {
    this.router = Router();
  }
  public init(): Router {
    this.server.all(
      '*',
      (request: Request, response: Response, next: NextFunction) => {
        const token = request.headers['x-access-token'];
        const auth = request.originalUrl.split('/').includes('auth');
        const register = request.originalUrl.split('/').includes('register');
        if ((token && isValidToken(String(token))) || auth || register) {
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
    this.router = this.routesModel.getDefaultRoutes();
    this.routes();
    return this.router;
  }

  private routes(): Router {
    /**
     * @apiName Auth Controller
     * @description Authorization
     * @method POST
     * @body { email: string, password: string }
     * @return user data - token
     */
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

    /**
     * @apiName Boards Controller
     * @description
     * @method GET
     * @body no body
     * @authotization true
     * @headers { token: string: uid: number }
     * @return boards data
     */
    this.router
      .route(`${this.routesModel.version}/boards`)
      .get(this.boardsController.getBoardsByUserId.bind(this.boardsController));
    this.router
      .route(`${this.routesModel.version}/get-all-boards/search`)
      .post(this.boardsController.search.bind(this.boardsController));

    /**
     * @apiName Teams Controller
     * @description
     * @method GET
     * @body no body
     * @authotization true
     * @headers { token: string: uid: number }
     * @return teams data
     */
    this.router
      .route(`${this.routesModel.version}/teams`)
      .get(this.teamsController.getTeamsByUserId.bind(this.teamsController));
    this.router
      .route(`${this.routesModel.version}/get-all-teams/search`)
      .post(this.teamsController.search.bind(this.teamsController));

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
