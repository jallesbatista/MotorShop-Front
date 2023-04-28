import { createPostSchema } from "@/schemas";
import * as z from "zod";
import { TUser } from "./user.interfaces";

export type TCreatePoster = z.infer<typeof createPostSchema>;

export interface IPoster extends TCreatePoster {
  id: string;
  createdAt: string;
  updatedAt: string;
  user: TUser;
}

export interface IPosterFilters {
  brands: string[];
  models: string[];
  colors: string[];
  years: string[];
  fuel_types: string[];
}
