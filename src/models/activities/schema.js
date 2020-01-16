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
    availableDaysPerWeek: Joi.number()
      .integer()
      .valid(1, 2, 3, 7)
      .required(),
    pricePerDay: Joi.number(),
    timePerDayinMinutes: Joi.any().allow('30', '60', '120', '180'),
    id: Joi.string()
      .alphanum()
      .min(2)
      .max(30)
      .required(),
  }),
  update: Joi.object({
    category: Joi.string().valid('sports', 'table_games', 'watersports'),
    name: Joi.string()
      .alphanum()
      .min(2)
      .max(30),
    availableDaysPerWeek: Joi.number()
      .integer()
      .valid(1, 2, 3, 7),
    pricePerDay: Joi.string().regex(/[0-9]{10}/),
    timePerDayinMinutes: Joi.any().allow('30m', '1h', '2h', '3h'),
  }),
  id: Joi.object({
    id: Joi.string()
      .alphanum()
      .min(2)
      .max(30)
      .required(),
  }),
};
