import { IUser, IUserComment } from "./user.interfaces";

export interface IComment extends IUserComment {
  id: string;
  user: IUser;
  createdAt: string;
}
