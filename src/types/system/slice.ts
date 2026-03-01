export interface IAuthState {
  user: IUser | null;
  isLogin: boolean;
  unreadCount: number;
  access_token: string | null;
}
export interface ICommonState {
  sidebarCollapsed: boolean;
}
export interface IUser {
  _id: string;
  name: string;
  email?: string;
  isOnline?: boolean;
  role: TRole;
  isActive: boolean;
  phone?: string;
  photo?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface IMessage {
  _id: string;
  roomId: string;
  senderId: string;
  text: string;
  attachments?: string[];
  to: string[];
  from: IUser;
  createdAt: string;
  readBy: string[];
}

export interface IRoom {
  _id: string;
  name?: string;
  isGroup: boolean;
  users: IUser[];
  lastMessage: IMessage | null;
}

export interface IChatState {
  activeRoomId: string | null;
  unreadCount: number;
  chatView: string;
}
export type TRole = "user" | "admin";
