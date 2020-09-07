import { Request, Response } from 'express';
import { Includeable, Op } from 'sequelize';
import { Team } from '../models/';
import { BaseController } from './';

export class TeamsController extends BaseController<Team> {
  public include: Includeable[] = [
    {
      association: 'user',
      attributes: ['id', 'name', 'email', 'team_id', 'created_at'],
    },
  ];
  constructor() {
    super(Team);
  }
  public async getTeamsByUserId(
    request: Request,
    response: Response
  ): Promise<Response<Team>> {
    const user_id = request.headers.uid || '';
    if (!user_id) {
      return response
        .status(400)
        .json({ errors: ['User id not found on headers'] });
    }
    let count = 0;
    Team.count({ where: { user_id } }).then((c) => (count = c));
    Team.findAll({
      limit: 20,
      where: { user_id },
      include: this.include,
    })
      .then((teams: Team[]) => {
        if (teams) {
          response.header({ 'total-records': count });
          response.json(teams);
        } else {
          response.status(404).json({ errors: ['Content not found'] });
        }
      })
      .catch((err: Error) => response.status(500).json(err));
    return response;
  }
  public async search(
    request: Request,
    response: Response
  ): Promise<Response<Team>> {
    const { value, key } = request.body;
    const user_id = request.headers.uid || '';
    Team.findAll({
      where: {
        user_id,
        [key]: {
          [Op.like]: `%${value}%`,
        },
      },
      include: this.include,
    })
      .then((data: Team[]) => response.json(data))
      .catch((err: Error) => response.status(500).json(err));
    return response;
  }
}
