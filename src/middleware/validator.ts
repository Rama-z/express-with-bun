import { AnyZodObject, ZodError } from "zod";
import { NextFunction, Request, Response } from "express";

const zodValidator =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
      return;
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).send({
          message: err.issues?.[0].message,
        });
      }
      return res.status(400).json(err);
    }
  };

export default zodValidator;
