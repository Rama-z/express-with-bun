import express, { Application } from "express";

import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import compression from "compression";
import redis from "redis";

import authRoutes from "./routes/authRoutes";
import profileRoutes from "./routes/profileRoutes";

// require("./config/redis");
const jsonParser = bodyParser.json();

const PORT: number = 8060;

class App {
  public app: Application;
  public text: object = { msg: "Capriconous web API" };
  private prefix: string = "/second-business/v1";

  constructor() {
    this.app = express();
    this.plugins();
    this.routes();
  }

  protected plugins(): void {
    this.app.use(morgan("dev"));
    this.app.use(compression());
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(jsonParser);
    this.app.disable("etag");
  }

  protected routes(): void {
    this.app.use(`${this.prefix}/auth`, authRoutes);
    this.app.use(`${this.prefix}/profile`, profileRoutes);
    this.app.get(`${this.prefix}/`, (req, res) => {
      res.send(this.text);
    });
  }
}

const app = new App().app;

app.listen(PORT, () => {
  console.log(`This server running on ports ${PORT}`);
});
