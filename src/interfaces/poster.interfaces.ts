import { createPostSchema } from "@/schemas";
import * as z from "zod";

export type TCreatePost = z.infer<typeof createPostSchema>;
