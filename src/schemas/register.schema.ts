import { z } from "zod";

const addressCreateSchema = z.object({
  zip_code: z.string().length(8, "Máximo de 8 caracteres"),
  state: z.string().min(2).max(2),
  city: z.string().min(4).max(50),
  street: z.string().min(4).max(127),
  number: z.string().max(4).nullish(),
  complement: z.string().max(127).nullish(),
});

const registerSchema = z
  .object({
    name: z.string().min(4, "Mínimo 4 caracteres").max(60, "Máximo 60 caracteres"),
    email: z.string().email("Deve ser um email válido"),
    cpf: z.string().length(11, "Deve ter 11 caracteres"),
    phone: z.string().length(12, "Deve ter 12 caracteres"),
    birth_date: z.string(),
    description: z.string().nullish(),
    user_type: z.enum(["buyer", "advertiser"]),
    is_seller: z.boolean().default(false),
    password: z.string().min(6, "Mínimo de 6 caracteres"),
    confirmPassword: z.string().min(6, "Mínimo 6 caracteres"),
  })
  .extend({
    address: addressCreateSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas diferentes",
    path: ["confirmPassword"],
  });

export default registerSchema;
