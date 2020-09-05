import { DataTypes, Model } from 'sequelize';
import { connection } from '../../database';

export class Team extends Model {
  public title?: string;
  public color?: string;
  // timestamps!
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
}
Team.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'teams',
    sequelize: connection,
  }
);

Team.sync({ force: false }).then(() => console.log('Team table created'));
