export default class CustomError extends Error {
  constructor(message, errorType, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.errorType = errorType;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }
  }
}
