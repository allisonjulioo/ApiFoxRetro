import { Request, Response } from 'express';
import { BaseController } from './';
import { Board } from './../models';

export class BoardsController extends BaseController<Board> {
  constructor() {
    super(Board);
  }
  public async findBoardsByUserId(
    request: Request,
    response: Response
  ): Promise<Response<Board>> {
    const { user_id } = request.params;

    Board.findAll({
      where: { user_id },
      include: [
        {
          association: 'team',
          attributes: ['id', 'title', 'description', 'enabled', 'created_at'],
        },
      ],
    })
      .then((boards: Board[]) => {
        if (boards) {
          response.json(boards);
        } else {
          response.status(404).json({ errors: ['Content not found'] });
        }
      })
      .catch((err: Error) => response.status(500).json(err));
    return response;
  }
}