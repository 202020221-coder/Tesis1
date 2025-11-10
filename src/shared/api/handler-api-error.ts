import axios, { AxiosError, CanceledError } from "axios";

export interface ApiError {
  status: number;
  message: string | string[];
  type: "Axios" | "Other" | "Abort";
}

export const handlerApiError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {

    if (error instanceof CanceledError) {
      return {
        status: 500,
        message: "Error de abortamiento",
        type: "Abort",
      };
    }

    const axiosError = error as AxiosError<any>;

    const response = axiosError.response?.data;
    const status = response?.statusCode || axiosError.response?.data || 500;

    let message: string | string[] = response?.message || "Ocurrió un error inesperado. (comuníquese con sistemas)";

    return { status, message, type: "Axios" };
  }

  return {
    status: 500,
    message: "Ocurrió un error inesperado. (comuníquese con sistemas)",
    type: "Other",
  };
};
