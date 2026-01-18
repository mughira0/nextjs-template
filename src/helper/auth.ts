import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"; // For Next.js router
import { CookieOptions } from "@/types/system/cookies";
import { COOKIES_KEYS, SECRET_KEY } from "@/data/constants";
import { dispatchFromStore } from "@/redux/store/store";
import { logoutUser, saveLoginUserData } from "@/redux/slices/auth";
import { User } from "@/types/system/slice";
const handleEncryption = (value: string | null | undefined): string | null => {
  if (!value) return null;
  return CryptoJS.AES.encrypt(value, SECRET_KEY).toString();
};

// Decrypt
export const handleDecryption = (
  cipherText: string | null | undefined
): string | null => {
  if (!cipherText) return null;
  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted || null; // AES.decrypt can return empty string on invalid data
  } catch (error) {
    console.error("Decryption failed:", error);
    return null;
  }
};

// Save encrypted token as cookie
const setEncryptedCookie = (
  key: string,
  value: string | null | undefined,
  options: CookieOptions = {}
): void => {
  const encrypted = handleEncryption(value);
  if (!encrypted) return;

  Cookies.set(key, encrypted, {
    secure: true,
    sameSite: "Strict",
    expires: 30, // 30 days
    ...options,
  });
};

// Signin
export const handleSignin = (
  response: { user: User; token: string },
  router: AppRouterInstance, // Next.js App Router
  // router: NavigateFunction,     // Uncomment if using React Router
  redirect: string | null = null
): void => {
  console.log("Signin response:", response);
  const { token: accessToken } = response;

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
  redirect: string = "/auth/login",
  router: AppRouterInstance // Adjust type if using different router
): void => {
  Object.values(COOKIES_KEYS).forEach((key) => Cookies.remove(key));

  dispatchFromStore(logoutUser());

  // Small delay to ensure Redux state updates before redirect
  setTimeout(() => router.push(redirect), 100);
};
