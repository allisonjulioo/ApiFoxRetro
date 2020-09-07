import { Request, Response } from 'express';
import { Column } from '../models/';
import { BaseController } from './';

export class ColumnsController extends BaseController<Column> {
  private association = [
    {
      association: 'cards',
      include: [{ association: 'user', attributes: ['id', 'name', 'email'] }],
    },
  ];
  constructor() {
    super(Column);
  }
  public async getColumnsByBoardId(
    request: Request,
    response: Response
  ): Promise<Response<Column>> {
    const { board_id } = request.params;
    if (!board_id) {
      return response
        .status(400)
        .json({ errors: ['User id not found on headers'] });
    }
    let count = 0;
    Column.count({ where: { board_id } }).then((c) => (count = c));
    Column.findAll({
      limit: 20,
      where: { board_id },
      include: this.association,
    })
      .then((boards: Column[]) => {
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
}
