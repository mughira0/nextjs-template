export interface ApiResponse<T = any> {
  success: true;
  data: T;
}

export interface ApiError {
  success: false;
  error: string[]; // Array of error messages for consistency
}
export type ApiResult<T = any> = ApiResponse<T> | ApiError;
