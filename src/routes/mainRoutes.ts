import { Router } from "express";

import { TRouter } from "../types";

abstract class MainRoutes implements TRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  abstract routes(): void;
}

export default MainRoutes;
