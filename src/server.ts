import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Application } from 'express';
import { Routes } from './routes';

export default class Server extends Routes {
  public server: Application = express();
  private port: number | string;
  constructor() {
    super();
    this.port = 8080 || process.env.NODE_ENV;
    this.start();
    this.config();
  }
  private start() {
    this.server.listen(this.port, () =>
      console.log(`Running at http://localhost:${this.port}`)
    );
  }
  private config() {
    this.server.use(bodyParser.json());
    this.server.use(cors());
    this.server.use(this.init());
    this.server.use(bodyParser.urlencoded({ extended: false }));
  }
}
new Server();
