import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

export const isLogin = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  if (!req.headers.authorization) {
    return res.status(401).json({
      status: 401,
      message: "Login first",
    });
  }
  const token: string = req.headers.authorization.split(" ")[1];
  try {
    const credential: string | object = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY || "",
      { issuer: process.env.JWT_ISSUER_KEY }
    );
    if (credential.toString().length === 0) {
      return res.status(401).json({
        status: 401,
        message: "token invalid",
      });
    }
    req.app.locals.decodedPayloads = credential;
    next();
  } catch (err) {
    return res.status(401).json({
      status: 401,
      msg: "You have to login re-login first",
      data: null,
      err,
    });
  }
};
