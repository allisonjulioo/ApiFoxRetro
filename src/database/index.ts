import { Op, Sequelize } from 'sequelize';
import { DatabaseConfig } from '../config';
const config = new DatabaseConfig();

export const connection = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: 'mysql',
    logging: false,
    operatorsAliases: {
      $and: Op.and,
      $or: Op.or,
      $eq: Op.eq,
      $gt: Op.gt,
      $lt: Op.lt,
      $lte: Op.lte,
      $like: Op.like,
    },
    define: {
      timestamps: true,
      underscored: true,
    },
  }
);

connection
  .authenticate()
  .then(() => {
    console.log('Connection database has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
