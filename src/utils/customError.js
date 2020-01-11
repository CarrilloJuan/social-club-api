export default class CustomError extends Error {
  constructor(message, errorType) {
    super(message);
    this.errorType = errorType;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }
  }
}
