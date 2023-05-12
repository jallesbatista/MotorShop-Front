import { z } from "zod";
import { resetPasswordSchema } from "@/schemas";

type IResetPassword = z.infer<typeof resetPasswordSchema>;

export type { IResetPassword };
