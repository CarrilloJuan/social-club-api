import { logger } from '../../utils';
import { validationError } from '../../utils/customErrors';

export default (schema, property) => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property], { abortEarly: false });
    if (!error) {
      next();
    } else {
      const errorInfo = validationError.buildErrorInfo(error);
      logger.error(`${errorInfo.title} ${JSON.stringify(errorInfo.errors)}`);
      res.status(400).json({ ...errorInfo });
    }
  };
};
