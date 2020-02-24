import Joi from '@hapi/joi';

export default {
  create: Joi.object({
    firstName: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),
    lastName: Joi.string()
      .alphanum()
      .min(2)
      .max(30)
      .required(),
    password: Joi.string()
      .min(6)
      .max(30)
      .required(),
    phoneNumber: Joi.string().regex(/[0-9]{10}/),
    email: Joi.string()
      .email()
      .required(),
  }),
  update: Joi.object({
    firstName: Joi.string()
      .alphanum()
      .min(6)
      .max(30),
    lastName: Joi.string()
      .alphanum()
      .min(2)
      .max(30),
    displayName: Joi.string()
      .alphanum()
      .min(6)
      .max(30),
    password: Joi.string()
      .min(8)
      .max(30),
    phoneNumber: Joi.string().regex(/[0-9]{10}/),
    email: Joi.string().email(),
  }),
  uuid: Joi.object({
    id: Joi.string().required(),
  }),
};
