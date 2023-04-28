import { z } from "zod";

const resetPasswordSchema = z
  .object({
    password: z.string().nonempty("Senha obrigatória").min(6, "Mínimo de 6 caracteres"),
    confirmPassword: z.string().nonempty("Confirmação de senha obrigatória"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confirmação incorreta",
    path: ["confirmPassword"],
  });

export default resetPasswordSchema;
