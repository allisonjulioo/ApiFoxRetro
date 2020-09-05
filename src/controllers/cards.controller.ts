import { Card } from '../models/';
import { BaseController } from './';

export class CardsController extends BaseController<Card> {
  constructor() {
    super(Card);
  }
}
