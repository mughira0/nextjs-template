import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"; // For Next.js router
import { CookieOptions } from "@/types/system/cookies";
import { COOKIES_KEYS, SECRET_KEY } from "@/data/constants";
import { dispatchFromStore } from "@/redux/store/store";
import { logoutUser, saveLoginUserData } from "@/redux/slices/auth";
import { IUser } from "@/types/system/slice";
const handleEncryption = (value: string | null | undefined): string | null => {
  if (!value) return null;
  return CryptoJS.AES.encrypt(value, SECRET_KEY).toString();
};

// Decrypt
export const handleDecryption = (
  cipherText: string | null | undefined,
): string | null => {
  if (!cipherText) return null;
  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted || null;
  } catch (error) {
    console.error("Decryption failed:", error);
    return null;
  }
};

// Save encrypted token as cookie
const setEncryptedCookie = (
  key: string,
  value: string | null | undefined,
  options: CookieOptions = {},
): void => {
  const encrypted = handleEncryption(value);
  if (!encrypted) return;

  Cookies.set(key, encrypted, {
    secure: true,
    sameSite: "Strict",
    expires: 30,
    ...options,
  });
};

// Signin
export const handleSignin = (
  response: { user: IUser; accessToken: string },
  router: AppRouterInstance,
  redirect: string | null = null,
): void => {
  console.log("Signin response:", response);
  const { accessToken } = response;
  console.log("Access Token:", accessToken);

  if (!accessToken) return;

  setEncryptedCookie(COOKIES_KEYS.Token, accessToken);
  setEncryptedCookie(COOKIES_KEYS.Role, response?.user?.role);

  dispatchFromStore(saveLoginUserData(response));

  if (redirect) {
    router.push(redirect);
  }
};

// Signout
export const handleSignout = (
  router?: AppRouterInstance,
  redirect?: string,
): void => {
  Object.values(COOKIES_KEYS).forEach((key) => Cookies.remove(key));

  dispatchFromStore(logoutUser());
  const logoutRoute = redirect ? redirect : "/auth/login";
  setTimeout(() => {
    if (redirect && router) {
      router.push(logoutRoute);
    } else {
      window.location.href = logoutRoute;
    }
  }, 100);
};
