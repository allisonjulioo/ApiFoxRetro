import bodyParser from 'body-parser';
import cors from 'cors';
import { config } from 'dotenv';
import express, { Application } from 'express';
import { Routes } from './routes';
config();
export default class Server extends Routes {
  public server: Application = express();
  private port: number | string;
  constructor() {
    super();
    this.port = process.env.NODE_ENV || 8080;
    this.start();
    this.startConfig();
  }
  private start() {
    this.server.listen(this.port, () =>
      console.log(`🏃 Running Server at port ${this.port}`)
    );
  }
  private startConfig() {
    this.server.use(bodyParser.json());
    this.server.use(cors());
    this.server.use(this.init());
    this.server.use(bodyParser.urlencoded({ extended: false }));
  }
}
new Server();
