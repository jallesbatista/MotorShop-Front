import { createPostSchema } from "@/schemas";
import * as z from "zod";
import { IUser } from "./user.interfaces";

export type TCreatePoster = z.infer<typeof createPostSchema>;

export interface IPoster extends TCreatePoster {
  id: string;
  createdAt: string;
  updatedAt: string;
  user: IUser;
}

export interface IPosterFilters {
  brands: string[];
  models: string[];
  colors: string[];
  years: string[];
  fuel_types: string[];
}
