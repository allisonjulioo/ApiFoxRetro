import { Model, Sequelize, SequelizeStatic } from 'sequelize';
import { UserInstance } from '../../models/User';
import { UserInterface } from './../UserInterface/index.d';
export interface DbInterface {
  sequelize: Sequelize;
  Sequelize: SequelizeStatic;
  User: Model<UserInstance, UserInterface>;
}
