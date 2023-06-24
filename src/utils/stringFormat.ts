import { AppError } from '../auth/axios';

/**
 * Returns the error message of the given error.
 * @param err the error
 */
export function getErrorMessage(err: AppError): string {
  return err.response.data;
}
