import { createPostSchema } from "@/schemas/poster.schemas";
import * as z from "zod";

export type TCreatePost = z.infer<typeof createPostSchema>;
