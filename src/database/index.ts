import { Sequelize } from 'sequelize';
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
