import { ReactNode } from "react";
import { ITeam, ITeamInput } from "../api/teams";
export interface IUserDecisionModalProps {
  show: boolean;
  setShow: (value: boolean | null) => void;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  onClick?: () => void | Promise<void>;
  isApiCall?: boolean;
}

export interface IModalSkeletonProps {
  show: boolean;
  setShow: (value: boolean) => void;
  children: ReactNode;
  width?: string;
  borderRadius?: string;
  header?: string | ReactNode;
  showCross?: boolean;
  footer?: ReactNode;
}
export interface ICreateUpdateTeamModal {
  show: boolean;
  setShow: (value: boolean | null) => void;
  data?: ITeam;
  isApiCall?: boolean;
  onClick?: (data: ITeamInput) => void | Promise<void>; // <- fix here
}
