import { ErrorType } from "./types";
export const createError = (
  status: number | undefined,
  message: string
):ErrorType => {
  return {
    status:status || 500,
    message,
  };
};
