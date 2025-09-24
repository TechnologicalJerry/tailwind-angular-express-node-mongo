import { object, string, TypeOf } from "zod";

export const createUserSchema = object({
  body: object({
    name: string({
      message: "Name is required",
    }),
    password: string({
      message: "Password is required",
    }).min(6, "Password too short - should be 6 chars minimum"),
    passwordConfirmation: string({
      message: "passwordConfirmation is required",
    }),
    email: string({
      message: "Email is required",
    }).email("Not a valid email"),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  }),
});

export type CreateUserInput = Omit<
  TypeOf<typeof createUserSchema>,
  "body.passwordConfirmation"
>;
