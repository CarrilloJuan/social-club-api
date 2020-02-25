import { logger } from '../../utils';
import CustomError from '../../utils/customErrors';

export default function errorHandler(err, _req, res, _next) {
  if (err instanceof CustomError) {
    err = err.buildErrorInfo();
  }
  logger.error(Object.assign({}, err));
  res.status(err.httpStatusCode || 500).json({ ...err });
}
