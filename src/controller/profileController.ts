import { Request, Response } from "express";

import profileRepo from "../repo/profileRepo";

class ProfileController {
  public getProfileInfo = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const result = await profileRepo.getProfileInfo(
        req.app.locals.decodedPayloads.uuid
      );
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

  public editProfileInfo = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const result = await profileRepo.editProfileInfo(
        req.body,
        req.app.locals.decodedPayloads.uuid
      );
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
}

export default new ProfileController();
