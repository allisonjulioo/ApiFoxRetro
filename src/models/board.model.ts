import { DataTypes, Model } from 'sequelize';
import { connection } from './../database/index';
import { Team } from './team.model';

export class Board extends Model {
  public title?: string;
  public user_votes?: number;
  public limit_votes?: number;
  public in_voting?: number;
  public team_id?: string;
  // timestamps!
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
}

Board.init(
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
    user_votes: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    limit_votes: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    in_voting: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    team_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'boards',
    sequelize: connection,
  }
);
Board.belongsTo(Team, { foreignKey: 'team_id', as: 'team' });
Board.hasMany(Team, {
  foreignKey: 'user_id',
  as: 'columns',
});
Board.sync({ force: false }).then(() => console.log('✓ Boards'));
