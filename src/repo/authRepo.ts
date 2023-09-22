import { v4 as uuidv4 } from "uuid";

import db from "../config/postgres";

const jwt = require("jsonwebtoken");

class AuthRepository {
  private queryCheckEmail: string = "select * from users where email = $1";
  private queryRegister: string =
    "insert into users (email, password, uuid) values ($1, $2, $3) returning email, uuid";
  private queryCheckPassword: string = "select * from users where email = $1";
  private queryRegisterProfile: string =
    "insert into profile (uuid) values ($1) returning *";

  register(body: any): Promise<any> {
    return new Promise((resolve, reject) => {
      db.query(
        this.queryCheckEmail,
        [body.email],
        async (err: any, result: any) => {
          if (err) {
            return reject({
              status: 500,
              message: "internal server error",
            });
          }
          if (result.rows.length !== 0) {
            return reject({
              status: 401,
              message: "Email already used",
            });
          }

          const hashedPassword = await Bun.password.hash(body?.password, {
            algorithm: "bcrypt",
            cost: 10,
          });
          db.query(
            this.queryRegister,
            [body.email, hashedPassword, `${uuidv4()}`],
            (err: any, resultRegister: any) => {
              if (err) {
                return reject({
                  status: 401,
                  message: "register error",
                });
              }
              db.query(
                this.queryRegisterProfile,
                [resultRegister?.rows?.[0]?.uuid],
                (err: any, result: any) => {
                  if (err) {
                    return reject({
                      status: 401,
                      message: "register profile error",
                    });
                  }
                  return resolve({
                    status: 200,
                    message: "Register success",
                  });
                }
              );
            }
          );
        }
      );
    });
  }

  login(body: any): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!body.email || !body.password) {
        return reject({
          status: 403,
          message: "request body are undefined/ empty",
        });
      }
      db.query(
        this.queryCheckPassword,
        [body.email],
        async (err: any, passwordResult: any) => {
          if (err) {
            return reject({
              status: 501,
              message: "get password error",
            });
          }

          const isMatch = await Bun.password.verify(
            body?.password,
            passwordResult?.rows[0]?.password
          );

          if (!isMatch) {
            return reject({
              status: 403,
              message: "Wrong password",
            });
          }

          const payload = {
            id: passwordResult.rows[0].id,
            uuid: passwordResult.rows[0].uuid,
            email: passwordResult.rows[0].email,
          };

          const token = jwt.sign(payload, Bun.env.JWT_SECRET_KEY || "secret", {
            expiresIn: "1d",
            issuer: Bun.env.JWT_ISSUER_KEY,
          });

          // const newToken = jose.SignJWT();

          return resolve({
            status: 202,
            message: "login success",
            payload: {
              id: passwordResult.rows[0].id,
              uuid: passwordResult.rows[0].uuid,
              email: passwordResult.rows[0].email,
            },
            token,
          });
        }
      );
    });
  }

  logout(): Promise<any> {
    return new Promise(() => {
      return;
    });
  }
}

export default new AuthRepository();
