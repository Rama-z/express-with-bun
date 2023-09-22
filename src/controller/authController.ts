import { Request, Response } from "express";

import authRepo from "../repo/authRepo";

class AuthController {
  public register = async (req: Request, res: Response): Promise<Response> => {
    try {
      const result = await authRepo.register(req.body);
      return res.status(result.status).json({
        status: result.status,
        message: result.message,
        result: result.data,
      });
    } catch (err: any) {
      return res.status(err.status).json({
        status: err.status,
        errors: err,
      });
    }
  };

  public login = async (req: Request, res: Response): Promise<Response> => {
    try {
      const result = await authRepo.login(req.body);
      return res.status(result.status).json({
        result,
      });
    } catch (err: any) {
      return res.status(err.status).json({
        status: err.status,
        errors: err,
      });
    }
  };
}

export default new AuthController();
