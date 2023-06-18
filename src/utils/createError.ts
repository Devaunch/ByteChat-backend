import { ErrorType } from "./types";
export const createError = (
  message: string,
  status: number | undefined
):ErrorType => {
  return {
    status:status || 500,
    message,
  };
};
