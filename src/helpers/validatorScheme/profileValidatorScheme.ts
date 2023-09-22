import { z } from "zod";

class ProfileValidatorScheme {
  public static editProfileScheme = z.object({
    body: z.object({
      firstname: z.string({
        required_error: "First Name is Required",
      }),
      lastname: z.string({
        required_error: "Last Name is Required",
      }),
      gender: z.string({
        required_error: "Gender is Required",
      }),
      address: z.string({
        required_error: "Address is Required",
      }),
    }),
  });

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
}

export default ProfileValidatorScheme;

export const profileValidatorScheme = new ProfileValidatorScheme();
