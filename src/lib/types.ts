import z from "zod";

export const UserValidator = z.object({
  name: z.string().min(1, "This field is required"),
  email: z
    .string()
    .min(1, "This field is required")
    .email({ message: "Enter a valid email address" }),
  password: z.string().min(8, "Password must contain min 8 characters"),
});

export const UserAuthValidator = UserValidator.pick({
  email: true,
  password: true,
});

export const TodoValidator = z.object({
  title: z.string().min(1, "This field is required"),
  description: z.string().min(1, "This field is required"),
});

export type UserType = z.infer<typeof UserValidator>;

export type UserAuthType = z.infer<typeof UserAuthValidator>;

export type TodoValidatorType = z.infer<typeof TodoValidator>;
