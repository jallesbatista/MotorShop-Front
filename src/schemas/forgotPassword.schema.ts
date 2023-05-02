import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z.string().nonempty("Email obrigatório").email("Deve ser um email válido"),
});

export default forgotPasswordSchema;
