export interface ApiResponse<T = any> {
  success: true;
  data: T;
}

export interface ApiError<T = any> {
  success: false;
  data: T | null; // Include data for consistency, can be null in case of error
  error: string[]; // Array of error messages for consistency
}
export type ApiResult<T = any> = ApiResponse<T> | ApiError<T>;
export type TParams = Record<string, string | string[]>;
