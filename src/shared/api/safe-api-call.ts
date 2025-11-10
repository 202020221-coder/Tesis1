import { handlerApiError, type ApiError } from "./handler-api-error";

// interface Result<T> {
//   data: T | null;
//   status?: number;
//   error: ApiError | null;
// }

export type Result<T> =
  | { data: T; error: null; status: number }
  | { data: null; error: ApiError; status?: undefined }; //union discriminada

interface ApiResponse<T> {
  data: T;
  status: number;
}

export const safeApiCall = async <T>(apiCall: () => Promise<ApiResponse<T>>): Promise<Result<T>> => {
  try {
    const { data, status } = await apiCall();
    return { data, status, error: null };
  } catch (error) {
    const apiError = handlerApiError(error);
    return { data: null, error: apiError };
  }
};
