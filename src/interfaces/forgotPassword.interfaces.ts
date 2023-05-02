import { z } from "zod";
import { forgotPasswordSchema } from "@/schemas";

type IForgotPassword = z.infer<typeof forgotPasswordSchema>;

export type { IForgotPassword };
