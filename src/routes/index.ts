import { Router } from 'express';
import { BoardsController } from './../controllers/Boards/index';
import { UsersController } from './../controllers/Users/index';

export class Routes {
  private router: Router;
  private version: string = '/api/v2';
  private usersController: UsersController;
  private boardsController: BoardsController;
  constructor() {
    this.boardsController = new BoardsController();
    this.usersController = new UsersController();
    this.router = Router();
    this.router.get('/', async (req: any, res: any) => {
      return res
        .status(200)
        .json({ message: 'this is a version 2 from fox api' });
    });
    this.routes();
    console.log(this.routes());
  }
  routes(): Router {
    /**
     * @api {post} /api/user Create user
     * @apiName Create new user
     * @apiPermission admin
     * @apiGroup User
     *
     * @apiParam  {String} [userName] username
     * @apiParam  {String} [email] Email
     * @apiParam  {String} [phone] Phone number
     * @apiParam  {String} [status] Status
     *
     * @apiSuccess (200) {Object} mixed `User` object
     */

    this.router
      .route(`${this.version}/users`)
      .get(this.usersController.get)
      .post(this.usersController.create);
    this.router
      .route(`${this.version}/users/:id`)
      .get(this.usersController.find)
      .put(this.usersController.update)
      .delete(this.usersController.delete);
    this.router
      .route(`${this.version}/users/search`)
      .post(this.usersController.search.bind(this.usersController));

    /**
     * @api {post} /api/v2/boards Create board
     * @apiName Create new board
     * @apiPermission admin
     * @apiGroup Board
     *
     * @apiParam  {String} [titile] Title
     * @apiParam  {Number} [user_votes] User votes
     * @apiParam  {Number} [limit_votes] Limit votes
     * @apiParam  {boolean} [in_voting] In voting
     * @apiParam  {String} [team_id] Team Id
     *
     * @apiSuccess (200) {Object} mixed `Board` object
     */

    this.router
      .route(`${this.version}/boards`)
      .get(this.boardsController.get)
      .post(this.boardsController.create);
    this.router
      .route(`${this.version}/boards/:id`)
      .get(this.boardsController.find)
      .put(this.boardsController.update)
      .delete(this.boardsController.delete);
    this.router
      .route(`${this.version}/boards/search`)
      .post(this.boardsController.search.bind(this.boardsController));
    return this.router;
  }
}
