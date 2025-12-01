// /types/auth.ts

export interface User {
  id: string;
  name: string;
  email?: string;
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
