import { DataTypes, Model } from 'sequelize';
import { connection } from '../../database';
import { Board } from '../Board';
import { Card } from '../Card';

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
    tableName: 'columns',
    sequelize: connection,
  }
);
Team.belongsTo(Board, { foreignKey: 'board_id', as: 'board' });
Team.hasMany(Card, {
  foreignKey: 'column_id',
  as: 'cards',
});
Team.sync({ force: false }).then(() => console.log('Team table created'));
