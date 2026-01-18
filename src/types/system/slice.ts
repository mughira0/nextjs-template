// /types/auth.ts

export interface User {
  _id: string;
  name: string;
  email?: string;
  role: string | null;
  phone?: string;
}

export interface AuthState {
  user: User | null;
  isLogin: boolean;
  unreadCount: number;
  access_token: string | null;
}
export interface CommonState {
  sidebarCollapsed: boolean;
}
export type Message = {
  _id: string;
  roomId: string;
  senderId: string;
  text: string;
  attachments: string[];
  to: string[];
  from: User;
  createdAt: string;
  readBy: string[];
};

export type Room = {
  _id: string;
  name: string;
  users: string[];
  lastMessage: Message | null;
};

export type ChatState = {
  rooms: Room[];
  activeRoomId: string | null;
  messages: Message[];
  typingUsers: string[];
  unreadCount: number;
};
