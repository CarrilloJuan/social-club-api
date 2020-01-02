import { logger } from '../../utils';

export default (schema, property) => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property]);
    if (!error) {
      next();
    } else {
      const { details } = error;

      const message = details.map(e => e.message).join(',');

      logger.error(message);
      res.status(422).json({ error: message });
    }
  };
};
