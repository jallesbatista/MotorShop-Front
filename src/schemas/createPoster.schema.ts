import { z } from "zod";

const MAX_FILE_SIZE = 200000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const createPostSchema = z.object({
  brand: z.string().nonempty("Marca é obrigatória"),
  model: z.string().nonempty("Modelo é obrigatório"),
  year: z.string().nonempty("Ano é obrigatório"),
  fuel_type: z.string().nonempty(),
  kilometers: z.string().nonempty("Quilometragem é obrigatória").or(z.number()),
  color: z.string().nonempty("Cor é obrigatória"),
  fipe_price: z
    .string()
    .transform((fipe_price) => {
      return fipe_price.toString().replace(/[\.]/g, "").replace(",", ".");
    })
    .or(z.number()),
  price: z
    .string()
    .nonempty("Preço é obrigatório")
    .transform((price) => {
      return price.toString().replace(/[\.]/g, "").replace(",", ".");
    })
    .or(z.number()),
  description: z.string().nonempty("Descrição é obrigatória"),
  is_published: z.boolean().optional().default(false),
  images: z
    .array(
      z.object({
        image: z
          .custom<FileList>()
          .refine((files) => files?.length == 1, "Imagem é obrigatória")
          .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `O tamanho máximo de imagem é 2MB.`)
          .refine(
            (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
            ".jpg, .jpeg, .png and .webp files are accepted."
          )
          .transform((list) => list.item(0)),
      })
    )
    .optional(),
  publish_option: z.enum(["y", "n"]).optional(),
});

export default createPostSchema;
