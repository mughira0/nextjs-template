import { IUser } from "../system/slice";

export interface ITeam {
  _id: string;
  name: string;
  description?: string;
  members: IUser[];
  createdBy: IUser;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface ITeamInput {
  id?: string;
  name: string;
  description: string;
  members: string[];
}
