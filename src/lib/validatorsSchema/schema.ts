import * as z from "zod";

export const SignUpFormSchema = z.object({
  username: z
    .string()
    .min(6, { error: "Name must be atleast 6 character long. " })
    .trim(),
  email: z.email("Please enter a valid email. "),
  password: z
    .string()
    .min(6, { error: "Password must be atleast 6 characters long. " })
    .trim(),
});

export const SignInFormSchema = z.object({
  email: z.email("Invalid email. "),
  password: z
    .string()
    .min(6, { error: "Password must be atleast 6 characters long. " })
    .trim(),
});



export type SignUpFormState =
  | {
      username?: string;
      email?: string,
      password?: string;
      errors?: {
        username?: string[];
        email?: string[];
        password?: string[];
      };
      error?: string;
      message?: string;
      statusCode?: Number
    }
  | undefined;


  export type SignInFormState =
  | {
      email?: string,
      password?: string;
      errors?: {
        email?: string[];
        password?: string[];
      };
      error?: string,
      message?: string;
      statusCode?: Number
    }
  | undefined;


  export const sessionSchema = z.object({
  id: z.string(),
});

export type Cookies = {
  set: (
    key: string,
    value: string,
    options: {
      secure?: boolean;
      httpOnly?: boolean;
      sameSite?: "strict" | "lax";
      expires?: number;
    }
  ) => void;
  get: (key: string) => { name: string; value: string } | undefined;
  delete: (key: string) => void;
};
