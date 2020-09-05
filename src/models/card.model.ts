import { DataTypes, Model } from 'sequelize';
import { connection } from '../database';

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
    content: {
      type: DataTypes.STRING,
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

Card.sync({ force: false }).then(() => console.log('Card table created'));
