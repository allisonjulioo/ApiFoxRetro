import { BaseController } from './';
import { User } from './../models/';

export class UsersController extends BaseController<User> {
  constructor() {
    super(User);
  }
}
