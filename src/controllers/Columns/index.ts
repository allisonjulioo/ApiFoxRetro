import { Column } from '../../models/Column/index';
import { BaseService } from '../Base';

export class ColumnsController extends BaseService<Column> {
  constructor() {
    super(Column);
  }
}
