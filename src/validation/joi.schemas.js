const Joi = require('joi');

const registrationSchema = Joi.object({
  name: Joi.string()
    .regex(/^[a-zA-Z0-9\s]+$/)
    .min(3)
    .max(25)
    .required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .max(32)
    .required()
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/)
    .message(
      'The password must contain at least one number, one lowercase letter and one uppercase letter'
    ),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .max(32)
    .required()
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/),
});

const passwordResetRequestSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Email is not valid',
    'any.required': 'missing required field email',
  }),
});

const passwordResetSchema = Joi.object({
  token: Joi.string().required(),
  newPassword: Joi.string()
    .min(8)
    .max(32)
    .required()
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/)
    .message(
      'The password must contain at least one number, one lowercase letter and one uppercase letter'
    ),
});

const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required().messages({
    'string.required': 'JWT token is required',
  }),
});

const activationLinkSchema = Joi.object({
  link: Joi.string().uuid({ version: 'uuidv4' }).required().messages({
    'string.uuid': 'Activation link must be a UUID',
    'string.required': 'Activation link is required',
  }),
});

const eventImageSchema = Joi.object({
  eventImage: Joi.string()
    .required()
    .pattern(/^event[0-9]{13}.jpg$/),
});

const eventSchema = Joi.object({
  locale: Joi.string().required(),
  eventTitle: Joi.string().required(),
  date: Joi.date().required(),
  time: Joi.string().required(),
  description: Joi.string().required(),
  eventUrl: Joi.string().required(),
  city: Joi.string().required(),
  street: Joi.string().required(),
  notes: Joi.string().optional(),
  coordinates: Joi.string()
    .regex(/^-?\d+\.\d+, -?\d+\.\d+$/)
    .required(),
  eventType: Joi.string().required(),
  eventImage: Joi.string()
    .required()
    .pattern(/^event[0-9]{13}.jpg$/),
});

const checkIdSchema = Joi.object({
  id: Joi.number().required().messages({
    number: 'id must be a number',
    required: 'id is required',
  }),
});

const userIdSchema = Joi.object({
  userId: Joi.number().required().messages({
    number: 'userId must be a number',
    required: 'userId is required',
  }),
});

module.exports = {
  registrationSchema,
  loginSchema,
  passwordResetRequestSchema,
  passwordResetSchema,
  refreshTokenSchema,
  activationLinkSchema,
  eventImageSchema,
  eventSchema,
  checkIdSchema,
  userIdSchema,
};
