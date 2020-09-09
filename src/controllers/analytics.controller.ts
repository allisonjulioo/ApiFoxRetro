import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { ChartLine } from '../interfaces/chart-line.interface';
import { Board, Card } from '../models';
import { ExcludeCloudWords } from './../enums/cloud-words-exclude.enum';
import { Column } from './../models/column.model';
import { BaseController } from './base.controller';

export class AnalyticsController extends BaseController<Board> {
  constructor() {
    super(Board);
  }
  async getLines(
    request: Request,
    response: Response
  ): Promise<Response<Column>> {
    const { uid } = request.headers;
    const boards = await Board.findAll({
      where: {
        user_id: String(uid),
      },
      attributes: ['id', 'title'],
      include: [
        {
          association: 'columns',
          include: [
            {
              attributes: ['content', 'id'],
              association: 'cards',
            },
          ],
        },
      ],
    });
    const data: ChartLine[] = [];
    if (boards) {
      boards.forEach((board, index) => {
        board.columns.forEach((column, i) => {
          data.push({
            board: board.title || '',
          });
          data[index].columns?.push({
            column: column.title || '',
            cards: column.cards.length,
          });
        });
        console.log(data);
      });
      return response.json({
        ...data,
      });
    }
    return boards;
  }
  async getCloudWords(request: Request, response: Response) {
    const { uid: user_id } = request.headers;
    let id_boards: string[] = [];
    let id_columns: string[] = [];
    let content_cards = '';
    const board = await Board.findAll({
      where: {
        user_id: String(user_id),
      },
      attributes: ['id'],
    });
    board.map((board) => id_boards.push(String(board.id)));

    const column = await Column.findAll({
      where: {
        board_id: {
          [Op.in]: id_boards,
        },
      },
      attributes: ['id'],
      include: [
        {
          attributes: ['content'],
          association: 'cards',
        },
      ],
    });
    column.map((col) => id_columns.push(col.id));
    const card = await Card.findAll({
      attributes: ['content'],
      where: {
        column_id: {
          [Op.in]: id_columns,
        },
      },
    });
    card.map((card) => (content_cards += ` ${card.content}`));
    content_cards.replace('-', '').replace('  ', '').replace('   ', '');
    const words = content_cards.split(' ');
    const excludes = ExcludeCloudWords.words.split(',');
    for (let i = words.length - 1; i >= 0; i--) {
      for (const j in excludes) {
        if (words[i] === excludes[j]) {
          words.splice(i, 1);
        }
      }
    }
    const weight = (words: string[]): number =>
      words.reduce((a: any, b: any) => ({ ...a, [b]: (a[b] || 0) + 1 }), []);
    const entries = Object.entries(weight(words));
    let cloudData = [];

    for (const [text, weight] of entries) {
      if (weight > 1) {
        cloudData.push({
          text,
          weight,
        });
      }
    }
    return response.status(200).json(cloudData);
  }
}
