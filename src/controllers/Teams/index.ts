import { Team } from '../../models/Team/index';
import { BaseService } from '../Base';

export class TeamsController extends BaseService<Team> {
  constructor() {
    super(Team);
  }
}
