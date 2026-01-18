import { createHeaders } from "@/helper/generic";
import { ApiResult } from "@/types/api/generic";
import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";

const getErrorMessage = (error: any): string[] => {
  // Axios error object
  if (error?.response?.data?.message) {
    const messages = error.response.data.message;
    if (Array.isArray(messages)) return messages;
    if (typeof messages === "string") return [messages];
  }

  // Network or Axios-level error message
  if (error?.message) {
    // Common network issues
    if (error.code === "ERR_NETWORK")
      return ["Network error. Please check your connection."];
    if (error.code === "ECONNABORTED")
      return ["Request timeout. Please try again."];
    return [error.message];
  }

  // Fallback based on HTTP status
  if (error?.response?.status) {
    switch (error.response.status) {
      case 400:
        return ["Bad request. Please check your input."];
      case 401:
        return ["Unauthorized. Your session may have expired."];
      case 403:
        return ["Forbidden. You don't have permission."];
      case 404:
        return ["Resource not found."];
      case 409:
        return ["Conflict. Resource already exists or is in use."];
      case 422:
        return ["Validation failed. Check your data."];
      case 500:
        return ["Server error. Please try again later."];
      case 502:
      case 503:
      case 504:
        return ["Service unavailable. Try again in a moment."];
      default:
        return [`HTTP ${error.response.status}: An error occurred.`];
    }
  }

  return ["An unexpected error occurred."];
};

// Generic request wrapper
const request = async <T = any>(
  method: Method,
  url: string,
  data: any = null,
  accessToken: string | null = null,
  config: AxiosRequestConfig = {}
): Promise<ApiResult<T>> => {
  const isFormData = data instanceof FormData;
  const headers = createHeaders(accessToken, isFormData);

  try {
    const response: AxiosResponse<T> = await axios({
      method,
      url,
      data,
      headers,
      timeout: 15000, // 15s timeout
      ...config,
    });

    return { success: true, data: response.data };
  } catch (error: any) {
    console.log("Error caught in request:", error);
    const messages = getErrorMessage(error);

    // Log for debugging (remove in production if needed)
    console.log("API Error:");

    // Show toast notifications
    messages.forEach((msg) => {
      // toast.error(msg, {
      //   duration: 6000,
      //   position: "top-center",
      // });
    });

    return { success: false, error: messages };
  }
};

// Exported typed methods
export const Get = <T = any>(
  url: string,
  accessToken: string | null = null,
  config: AxiosRequestConfig = {}
): Promise<ApiResult<T>> => request<T>("get", url, null, accessToken, config);

export const Post = <T = any>(
  url: string,
  data: any = null,
  accessToken: string | null = null,
  config: AxiosRequestConfig = {}
): Promise<ApiResult<T>> => request<T>("post", url, data, accessToken, config);

export const Patch = <T = any>(
  url: string,
  data: any = null,
  accessToken: string | null = null,
  config: AxiosRequestConfig = {}
): Promise<ApiResult<T>> => request<T>("patch", url, data, accessToken, config);

export const Put = <T = any>(
  url: string,
  data: any = null,
  accessToken: string | null = null,
  config: AxiosRequestConfig = {}
): Promise<ApiResult<T>> => request<T>("put", url, data, accessToken, config);

export const Delete = <T = any>(
  url: string,
  accessToken: string | null = null,
  config: AxiosRequestConfig = {}
): Promise<ApiResult<T>> =>
  request<T>("delete", url, null, accessToken, config);
