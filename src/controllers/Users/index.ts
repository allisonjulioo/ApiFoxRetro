import { BaseService } from '../Base';
import { User } from './../../models/User/index';

export class UsersController extends BaseService<User> {
  constructor() {
    super(User);
  }
}
