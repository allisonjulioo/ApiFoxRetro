import { Column } from '../models/';
import { BaseController } from './';

export class ColumnsController extends BaseController<Column> {
  constructor() {
    super(Column);
  }
}
