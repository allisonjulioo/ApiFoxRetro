import { Card } from '../../models/Card/index';
import { BaseService } from '../Base';

export class CardsController extends BaseService<Card> {
  constructor() {
    super(Card);
  }
}
