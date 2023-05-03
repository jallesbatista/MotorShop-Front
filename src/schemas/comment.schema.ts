import { z } from "zod";

const commentSchema = z.object({
  comment: z.string().nonempty("Não é permitido comentário vazio"),
});

export default commentSchema;
