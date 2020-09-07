import { config } from 'dotenv';
import { Dialect } from 'sequelize/types';
config();
export class DatabaseConfig {
  public dialect: Dialect = 'mysql';
  public host = String(process.env.DB_HOST);
  public username = String(process.env.DB_USERNAME);
  public password = String(process.env.DB_PASSWORD);
  public database = String(process.env.DB_NAME);
}
