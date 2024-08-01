import { ApiError } from "./types/api-error";

export const getError = (error: ApiError) => {
  return error.message;
};
