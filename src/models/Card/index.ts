import { DataTypes, Model } from 'sequelize';
import { connection } from '../../database';
import { Column } from '../Column';
import { User } from '../User';

export class Card extends Model {
  public content?: string;
  public likes?: number;
  public checked?: number;
  // timestamps!
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
}
Card.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    likes: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    checked: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    tableName: 'cards',
    sequelize: connection,
  }
);
Card.belongsTo(Column, { foreignKey: 'column_id', as: 'column' });
Card.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

Card.sync({ force: false }).then(() => console.log('Card table created'));
