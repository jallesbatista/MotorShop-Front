import { z } from "zod";

export const addressCreateSchema = z.object({
  zip_code: z
    .string()
    .nonempty("Código postal obrigatório")
    .length(9, "Deve conter 8 caracteres")
    .transform((cep) => cep.replace(/\D/g, "")),
  state: z.string().nonempty("Estado obrigatório").min(2),
  city: z.string().nonempty("Cidade obrigatória").max(50),
  street: z.string().nonempty("Rua obrigatória").max(127),
  number: z
    .string()
    .max(6, "Deve conter ao máximo 6 dígitos")
    .nullish()
    .transform((value) => (value ? value : null)),
  complement: z
    .string()
    .max(127)
    .nullish()
    .transform((value) => (value ? value : null)),
});

const registerSchema = z
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
    user_type: z.enum(["buyer", "advertiser"]),
    is_seller: z.boolean().default(false),
    password: z.string().nonempty("Senha obrigatória").min(6, "Mínimo de 6 caracteres"),
    confirmPassword: z.string().nonempty("Confirmação de senha obrigatória"),
  })
  .extend({
    address: addressCreateSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confirmação incorreta",
    path: ["confirmPassword"],
  })
  .transform((data) => {
    if (data.user_type == "advertiser") {
      data.is_seller = true;
    }
    return data;
  });

export default registerSchema;
