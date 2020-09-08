import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { BaseController } from './';
import { Board } from './../models';

export class BoardsController extends BaseController<Board> {
  private association = [
    {
      association: 'team',
      attributes: ['id', 'title', 'description', 'enabled', 'created_at'],
    },
  ];
  constructor() {
    super(Board);
  }
  public async getBoardsByUserId(
    request: Request,
    response: Response
  ): Promise<Response<Board>> {
    const user_id = request.headers.uid || '';
    if (!user_id) {
      return response
        .status(400)
        .json({ errors: ['User id not found on headersS'] });
    }
    let count = 0;
    Board.count({ where: { user_id } }).then((c) => (count = c));
    Board.findAll({
      limit: 20,
      where: { user_id },
      include: this.association,
    })
      .then((boards: Board[]) => {
        if (boards) {
          response.header({ 'total-records': count });
          response.json(boards);
        } else {
          response.status(404).json({ errors: ['Content not found'] });
        }
      })
      .catch((err: Error) => response.status(500).json(err));
    return response;
  }

  public async getAllBoardsSearch(
    request: Request,
    response: Response
  ): Promise<Response<Board>> {
    const { value, key } = request.body;
    const user_id = request.headers.uid || '';
    const options = {
      where: {
        user_id,
        [key]: {
          [Op.like]: `%${value}%`,
        },
      },
      include: this.association,
    };
    return this.search(options)
      .then((success) => response.status(200).json(success))
      .catch((err: Error) => response.status(500).json(err));
  }
}
