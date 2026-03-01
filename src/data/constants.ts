export const COOKIES_KEYS = {
  Token: "__xypd_token__" as const,
  Role: "__xypd_role__" as const,
};
export const SECRET_KEY = "xypd";
export const MOBILE_BREAKPOINT = 1025;
export const TOTAL_RECORDS = 10;
// https://node-express-template-production-130d.up.railway.app/
export const API_BASE_URL =
  "https://node-express-template-production-130d.up.railway.app/api/v1";
export const SOCKET_BASE_URL =
  "https://node-express-template-production-130d.up.railway.app/";

// export const API_BASE_URL = "http://localhost:5000/api/v1";

// export const SOCKET_BASE_URL = "http://localhost:5000";

export const S3_URL = "";
export const baseUrl = (url: string) => {
  return `${API_BASE_URL}/${url}`;
};
export const imageUrl = (url: string) => {
  if (!url) return "";

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  return `${S3_URL}${url}`;
};

export const TOAST_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
} as const;
