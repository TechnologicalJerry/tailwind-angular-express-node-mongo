import { object, string } from "zod";

export const createSessionSchema = object({
  body: object({
    email: string({
      message: "Email is required",
    }),
    password: string({
      message: "Password is required",
    }),
  }),
});
