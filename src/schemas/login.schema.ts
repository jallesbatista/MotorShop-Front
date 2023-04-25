import { z } from "zod";

const loginSchema = z.object({
  email: z.string().nonempty("Email obrigatório"),
  password: z.string().nonempty("Senha obrigatória"),
});

export default loginSchema;
