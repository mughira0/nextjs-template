import { toast } from "@/components/toast/toast";
import { imageUrl, TOAST_TYPES } from "@/data/constants";
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
