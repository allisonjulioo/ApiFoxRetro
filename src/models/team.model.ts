import { DataTypes, Model } from 'sequelize';
import { connection } from '../database';
import { User } from './user.model';

export class Team extends Model {
  public title?: string;
  public description?: string;
  public logo?: string;
  public enabled?: boolean;
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
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    tableName: 'teams',
    sequelize: connection,
  }
);
Team.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Team.hasMany(User, {
  foreignKey: 'team_id',
  as: 'Users',
});
Team.sync({ force: false }).then(() => console.log('✓ Teams'));
