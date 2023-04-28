import { z } from "zod";
import { addressCreateSchema } from "./register.schema";

const updateUserSchema = z
  .object({
    name: z.string().nonempty("Nome obrigatorio").max(60, "Máximo 60 caracteres"),
    email: z.string().nonempty("Email obrigatório").email("Deve ser um email válido"),
    cpf: z
      .string()
      .nonempty("CPF obrigatório")
      .length(14, "Deve conter 11 dígitos")
      .transform((cpf) => cpf.replace(/\D/g, "")),
    phone: z
      .string()
      .nonempty("Contato obrigatório")
      .min(15, "Deve conter 11 dígitos")
      .refine(
        (phone) => {
          return phone.replace(/\D/g, "").split("")[2] == "9";
        },
        { message: "Deve seguir o formato (DDD) 9****-****" }
      )
      .transform((phone) => phone.replace(/\D/g, "")),
    birth_date: z
      .string()
      .nonempty("Data de nascimento obrigatória")
      .refine(
        (date) => {
          const birthDate = new Date(date);
          const ageDif = Date.now() - birthDate.getTime();
          const ageDate = new Date(ageDif);

          const age = Math.abs(ageDate.getUTCFullYear() - 1970);

          return age >= 18;
        },
        { message: "Você deve ter no mínimo 18 anos" }
      ),
    description: z
      .string()
      .nonempty("Descrição obrigatória")
      .min(20, "Deve ter no mínimo 20 caracteres"),
    //   password: z.string().nonempty("Senha obrigatória").min(6, "Mínimo de 6 caracteres"),
    //   confirmPassword: z.string().nonempty("Confirmação de senha obrigatória"),
    address: addressCreateSchema.partial(),
  })
  .partial();

export default updateUserSchema;
