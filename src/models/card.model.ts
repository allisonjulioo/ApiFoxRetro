import { DataTypes, Model } from 'sequelize';
import { connection } from '../database';
import { User } from './user.model';

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
      allowNull: true,
    },
    content: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    checked: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'cards',
    sequelize: connection,
  }
);
Card.belongsTo(User, { as: 'user', foreignKey: 'user_id' });
Card.sync({ force: false }).then(() => console.log('✓ Cards'));
