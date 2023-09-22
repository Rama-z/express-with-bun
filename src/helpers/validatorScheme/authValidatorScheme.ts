import { z } from "zod";

class AuthValidatorScheme {
  public static registerScheme = z.object({
    body: z.object({
      email: z
        .string({
          required_error: "Email is required",
        })
        .email("Not a valid email"),
      password: z
        .string({
          required_error: "Password is required",
        })
        .min(8, { message: "Password should not less than 8 letter" }),
    }),
  });

  public static loginScheme = z.object({
    body: z.object({
      email: z
        .string({
          required_error: "Email is required",
        })
        .email("Not a valid email"),
      password: z.string({
        required_error: "Full name is required",
      }),
    }),
  });

  public static editUserScheme = z.object({
    body: z.object({
      fullName: z.string({
        required_error: "Full name is required",
      }),
      number: z.number(),
      email: z
        .string({
          required_error: "Email is required",
        })
        .email("Not a valid email"),
    }),
  });

  public async myMethod(): Promise<string> {
    return "";
  }
}

export default AuthValidatorScheme;

export const myValidatorScheme = new AuthValidatorScheme();
