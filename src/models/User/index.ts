import { DataTypes, Model } from 'sequelize';
import { connection } from './../../database/index';
import { Board } from './../Board/index';

export class User extends Model {
  public id?: string;
  public name?: string;
  public email?: string;
  public password?: string;
  public teams_ids?: string;
  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    password: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    teams_ids: {
      type: new DataTypes.STRING(128),
      allowNull: true,
    },
  },
  {
    tableName: 'users',
    sequelize: connection,
  }
);
User.hasMany(Board, {
  foreignKey: 'user_id',
  as: 'boards',
});

User.sync({ force: false }).then(() => console.log('Users table created'));
