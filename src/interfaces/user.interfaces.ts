import { loginSchema, registerSchema, updateAdressSchema } from "@/schemas";
import { addressCreateSchema } from "@/schemas/register.schema";
import updateUserSchema from "@/schemas/updateUser.schema";
import { z } from "zod";

type IRegister = z.infer<typeof registerSchema>;

interface IUserAddress {
  zip_code: string;
  state: string;
  city: string;
  street: string;
  number?: string | undefined | null;
  complement?: string | undefined | null;
}

interface IUserCreate {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  birth_date: string;
  description?: string | undefined | null;
  is_seller: boolean;
  password: string;
  address: IUserAddress;
}

type TUserUpdate = z.infer<typeof updateUserSchema>;

type TUpdateUserAddress = z.infer<typeof updateAdressSchema>;
interface IUser extends Omit<IUserCreate, "password"> {
  id: string;
  createdAt: string;
  updatedAt: string;
}

type IUserLogin = z.infer<typeof loginSchema>;

export type { IRegister, IUserCreate, IUserLogin, IUser, TUserUpdate, TUpdateUserAddress };
