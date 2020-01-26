import CustomError from './customErrors';
import logger from './logger';

export const asyncError = fn => {
  return (req, res, next) => {
    const routePromise = fn(req, res, next);
    if (routePromise.catch) {
      routePromise.catch(err => next(err));
    }
  };
};

export const errorHandler = (err, req, res, next) => {
  console.log(err);
  if (err instanceof CustomError) {
    err = err.buildErrorInfo();
  }
  logger.error(Object.assign({}, err));
  res.status(err.httpStatusCode || 500).json({ ...err });
};

export const fatalError = err => {
  logger.error(`[fatal error] ${err.message}`);
  process.exit(1);
};
