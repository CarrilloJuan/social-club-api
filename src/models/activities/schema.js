import Joi from '@hapi/joi';

export default {
  create: Joi.object({
    category: Joi.string()
      .valid('sports', 'table_games', 'watersports')
      .required(),
    name: Joi.string()
      .alphanum()
      .min(2)
      .max(30)
      .required(),
    availableDays: Joi.number()
      .integer()
      .valid(1, 2, 3, 7)
      .required(),
    pricePerDay: Joi.number(),
  }),
  update: Joi.object({
    category: Joi.string().valid('sports', 'table_games', 'watersports'),
    name: Joi.string()
      .alphanum()
      .min(2)
      .max(30),
    availableDays: Joi.number()
      .integer()
      .valid(1, 2, 3, 7),
    pricePerDay: Joi.string().regex(/[0-9]{10}/),
  }),
  uuid: Joi.object({
    id: Joi.string().guid(),
  }),
};
