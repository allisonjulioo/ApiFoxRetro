import { DataTypes, Model } from 'sequelize';
import { connection } from '../database';
import { Card } from './card.model';

export class Column extends Model {
  public id!: string;
  public title?: string;
  public color?: string;
  public board_id!: string;
  public cards!: Card[];
  // timestamps!
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
}
Column.init(
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
    board_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'columns',
    sequelize: connection,
  }
);
Column.hasMany(Card, {
  foreignKey: 'column_id',
  as: 'cards',
});
Column.sync({ force: false }).then(() => console.log('✓ Columns'));
