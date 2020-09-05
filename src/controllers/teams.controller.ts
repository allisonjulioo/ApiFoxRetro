import { Team } from '../models/';
import { BaseController } from './';

export class TeamsController extends BaseController<Team> {
  constructor() {
    super(Team);
  }
}
