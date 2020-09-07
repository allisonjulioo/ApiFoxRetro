import { Router } from 'express';
import {
  BoardsController,
  CardsController,
  ColumnsController,
  TeamsController,
  UsersController,
} from '../controllers';
import { BaseInterface, RoutesInterface } from '../interfaces';
import { Board, Card, Column, Team, User } from './';

/**
 * @param Routes
 * @description
 * This generate default routes
 *
 * @api {post} 'api/v2/model Create model
 * @apiName Create new model
 * @apiPermission admin
 *
 *
 * @apiSuccess (200) {Object} mixed `Model` object
 */
export class RoutesModel {
  private router: Router;
  public version: string = '/api/v2';
  public usersController: BaseInterface<User> = new UsersController();
  public boardsController: BaseInterface<Board> = new BoardsController();
  public cardsConstroller: BaseInterface<Card> = new CardsController();
  public columnsController: BaseInterface<Column> = new ColumnsController();
  public teamsController: BaseInterface<Team> = new TeamsController();
  public models: RoutesInterface[] = [
    {
      model: 'boards',
      controller: this.boardsController,
    },
    {
      model: 'users',
      controller: this.usersController,
    },
    {
      model: 'teams',
      controller: this.teamsController,
    },
    {
      model: 'cards',
      controller: this.cardsConstroller,
    },
    {
      model: 'columns',
      controller: this.columnsController,
    },
  ];
  constructor() {
    this.router = Router();
    this.router.get('/', async (req: any, res: any) => {
      return res
        .status(200)
        .json({ message: 'this is a version 2 from fox api' });
    });
  }
  public routes(): Router {
    this.models.map(({ controller, model }) => {
      this.getDefaultRoutes(controller, model);
    });
    return this.router;
  }
  private getDefaultRoutes(
    controller: BaseInterface<any>,
    model: string
  ): Router {
    /**
     * @api {get} /api/get-all-model
     * @apiName Get all data model
     * @apiPermission user autenticated
     *
     *
     * @apiSuccess (200) {Array} mixed `Model` object
     */
    this.router
      .route(`${this.version}/get-all-${model}`)
      .get(controller.get.bind(controller));

    /**
     * @api {get} /api/model/:id
     * @apiName Get all data model
     * @apiPermission user autenticated
     *
     *
     * @apiSuccess (200) {Object} `Model` object
     */
    this.router
      .route(`${this.version}/${model}/:id`)
      .get(controller.find.bind(controller))
      .patch(controller.update.bind(controller))
      .delete(controller.delete.bind(controller));

    /**
     * @api {post} /api/model/new
     * @apiName Create new model
     * @apiPermission user autenticated
     *
     *
     * @apiSuccess (200) {Object} mixed `Model` object
     */
    this.router
      .route(`${this.version}/${model}/new`)
      .post(controller.create.bind(controller));

    return this.router;
  }
}
