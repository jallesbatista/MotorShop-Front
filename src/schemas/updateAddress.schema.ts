import { z } from "zod";
import { addressCreateSchema } from "./register.schema";

const updateAdressSchema = z.object({
  address: addressCreateSchema.partial(),
});

export default updateAdressSchema;
