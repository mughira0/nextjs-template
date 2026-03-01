import { toast } from "@/components/toast/toast";
import {
  baseUrl,
  imageUrl,
  TOAST_TYPES,
  TOTAL_RECORDS,
} from "@/data/constants";
import { TParams } from "@/types/api/generic";
import { ToastVariant } from "@/types/components/toast";
import { IUser } from "@/types/system/slice";
import moment from "moment";

export const cn = (...classes: (string | boolean | null | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};

export const createHeaders = (
  accessToken: string | null | undefined,
  isFormData: boolean = false,
): Record<string, string> => {
  const headers: Record<string, string> = {
    "ngrok-skip-browser-warning": "true",
  };

  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  // Add Authorization header only if token exists
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  return headers;
};
export const camelCaseToLowerCase = (str: string) => {
  if (!str) return "";
  return str.replace(/([A-Z])/g, " $1").trim();
};
export const camelCaseToCapitalized = (str: string) => {
  if (!str) return "";
  const s = camelCaseToLowerCase(str);
  return s.charAt(0).toUpperCase() + s.slice(1);
};
export const formatMessageDate = (date: string | Date, format = "hh:mm A") => {
  return moment(date).format(format);
};
export const formatDate = (date: string | Date, format = "DD-MM-YYY") => {
  return moment(date).format(format);
};
export const generateAvatarProps = (user: IUser) => {
  const fallback = getFirstCharacter(user.name || user.email || "U");
  const src = imageUrl(user?.photo || "");
  const alt = user.name || user.email || "User Avatar";
  const isOnline = user.isOnline || false;
  return {
    src,
    alt,
    fallback,
    isOnline,
  };
};

export const getFirstCharacter = (string: String) => {
  return string.charAt(0).toUpperCase();
};

export const renderToast = (
  message: string,
  variant: ToastVariant,
  delay?: number,
) => {
  if (variant === TOAST_TYPES.SUCCESS) {
    toast.success(message, delay);
  } else if (variant === TOAST_TYPES.ERROR) {
    toast.error(message, delay);
  } else if (variant === TOAST_TYPES.WARNING) {
    toast.warning(message, delay);
  }
};

export const getTotalCount = (
  total: number = 0,
  recordsPerPage: number = TOTAL_RECORDS,
) => {
  return Math.ceil(total / recordsPerPage);
};

export const makeUrlQyeryString = (
  params: Record<string, string | number>,
  url: string,
) => {
  const obj = {} as Record<string, string>;
  for (const key in params) {
    obj[key] = String(params[key]);
  }
  const queryString = new URLSearchParams(obj).toString();
  return baseUrl(url) + "?" + queryString;
};

export const validateParams = (
  params: TParams,
  skipKeys: string[] = [],
): boolean => {
  for (const key in params) {
    if (skipKeys.includes(key)) continue;

    const val = params[key];

    if (Array.isArray(val)) {
      if (val.length === 0) {
        renderToast(`${camelCaseToCapitalized(key)} is required.`, "error");
        return false;
      }
    } else {
      if (!val || String(val).trim() === "") {
        renderToast(`${camelCaseToCapitalized(key)} is required.`, "error");
        return false;
      }
    }
  }

  return true; // all validations passed
};
