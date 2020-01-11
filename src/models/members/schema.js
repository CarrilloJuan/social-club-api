import Joi from '@hapi/joi';

export default {
  create: Joi.object({
    name: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),
    lastName: Joi.string()
      .alphanum()
      .min(2)
      .max(30)
      .required(),
    age: Joi.number()
      .integer()
      .greater(10),
    phoneNumber: Joi.string().regex(/[0-9]{10}/),
    email: Joi.string()
      .email()
      .required(),
    address: Joi.string(),
  }),
  update: Joi.object({
    name: Joi.string()
      .alphanum()
      .min(3)
      .max(30),
    lastName: Joi.string()
      .alphanum()
      .min(2)
      .max(30),
    age: Joi.number()
      .integer()
      .greater(10),
    phoneNumber: Joi.string().regex(/[0-9]{10}/),
    email: Joi.string().email(),
    address: Joi.string(),
  }),
  uuid: Joi.object({
    id: Joi.string()
      .guid()
      .required(),
  }),
};
