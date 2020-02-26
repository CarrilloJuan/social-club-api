import logger from './logger';

const firestoreErrorCode = new Map([
  [2, { errorCode: 'unknown', httpStatusCode: 503, message: 'Unknown error' }],
  [
    3,
    {
      errorCode: 'invalid-argument',
      message: 'Client specified an invalid argument',
    },
  ],
  [
    5,
    {
      errorCode: 'not-found',
      httpStatusCode: 404,
      message: 'Some requested document was not found',
    },
  ],
  [
    6,
    {
      errorCode: 'already-exists',
      message: 'Some document that we attempted to create already exists.',
    },
  ],
  [
    7,
    {
      errorCode: 'permission-denied',
      httpStatusCode: 403,
      message:
        'The caller does not have permission to execute the specified operation.',
    },
  ],
  [
    14,
    {
      errorCode: 'unavailable',
      message: ' The service is currently unavailable.',
    },
  ],
  [
    16,
    {
      errorCode: 'unauthenticated',
      httpStatusCode: 401,
      message:
        'The request does not have valid authentication credentials for the operation.',
    },
  ],
]);

export default class CustomError extends Error {
  constructor(message, errorCode, httpStatusCode = 422) {
    super(message);
    this.message = message;
    this.errorCode = errorCode;
    this.httpStatusCode = httpStatusCode;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }
  }

  buildErrorInfo() {
    return {
      message: this.message,
      errorCode: this.errorCode,
      httpStatusCode: this.httpStatusCode,
    };
  }
}

export class DataModelError extends CustomError {
  constructor(firestoreCode, ctx, errorInfo, entity) {
    let message, errorCode, httpStatusCode;
    if (!firestoreCode || typeof firestoreCode === 'string') {
      ({ message, code: errorCode } = errorInfo);
    } else {
      ({ message, errorCode, httpStatusCode } = firestoreErrorCode.get(
        firestoreCode,
      ));
    }

    super(message, errorCode, httpStatusCode);

    this.title = "Data model's error";
    this.ctx = ctx;
    this.entity = entity;
  }

  buildErrorInfo() {
    return {
      title: this.title,
      message: this.message,
      errorCode: this.errorCode,
      ctx: this.ctx,
      entity: this.entity,
      httpStatusCode: this.httpStatusCode,
    };
  }
}

class ValidationError {
  constructor() {
    this.title = 'Validation errors';
    this.ctx = 'errors.validation';
  }

  buildErrorInfo(error) {
    const { details } = error;
    const fields = details.map(e => e.message);
    return {
      title: this.title,
      ctx: this.ctx,
      errors: fields,
    };
  }
}

const validationError = new ValidationError();

export const fatalError = err => {
  logger.error(`[fatal error] ${err.message}`);
  process.exit(1);
};

export { validationError };
