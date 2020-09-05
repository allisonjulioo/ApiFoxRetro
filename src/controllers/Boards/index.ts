import { BaseService } from '../Base';
import { Board } from './../../models/Board/index';

export class BoardsController extends BaseService<Board> {
  constructor() {
    super(Board);
  }
}
