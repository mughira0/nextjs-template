export interface CookieOptions {
  secure?: boolean;
  sameSite?: "Strict" | "Lax" | "None";
  expires?: number | Date;
  path?: string;
  domain?: string;
}
