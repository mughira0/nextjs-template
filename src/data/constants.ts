export const COOKIES_KEYS = {
  Token: "__xypd_token__" as const,
  Role: "__xypd_role__" as const,
};
export const SECRET_KEY = "xypd";
export const MOBILE_BREAKPOINT = 768;

export const API_BASE_URL = "http://localhost:5000/api/v1";
export const SOCKET_BASE_URL = "http://localhost:5000";

export const baseUrl = (url: string) => {
  return `${API_BASE_URL}/${url}`;
};

//  SOCKETS EVENTS
