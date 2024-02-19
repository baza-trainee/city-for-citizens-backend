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
  idIdentifier: Joi.string().uuid({ version: 'uuidv4' }).required(),
  locale: Joi.string().required(),
  eventTitle: Joi.string().required(),
  date: Joi.string()
    .pattern(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)
    .required(),
  time: Joi.string()
    .regex(/^([0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)
    .required(),
  description: Joi.string().required(),
  eventUrl: Joi.string()
    .uri({
      scheme: ['http', 'https'],
    })
    .allow('')
    .optional(),
  city: Joi.string().required(),
  street: Joi.string().required(),
  notes: Joi.string().allow('').optional(),
  coordinates: Joi.string()
    .regex(
      /^(\+|-)?((\d((\.)|\.\d{1,20})?)|(0*?[0-8]\d((\.)|\.\d{1,20})?)|(0*?4?[1-9]|0)((\.)|\.0{1,20})?),\s*(\+|-)?((\d((\.)|\.\d{1,20})?)|(0*?\d\d((\.)|\.\d{1,20})?)|(0*?1[0-7]\d((\.)|\.\d{1,20})?)|(0*?1[0-7][0-9]|[1-8]\d|90)((\.)|\.0{1,20})?)$/
    )
    .required(),
  eventType: Joi.string().required(),
  eventImage: Joi.string()
    .pattern(/^event\d{10,20}\.jpg$/)
    .required(),
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

const contactsSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Email is not valid',
    'any.required': 'Missing required field email',
  }),
  firstPhone: Joi.string()
    .regex(/^\+?[0-9]{12}$/)
    .messages({ 'string.pattern.base': `Phone number must have 12 digits.` })
    .required(),

  secondPhone: Joi.string()
    .regex(/^\+?[0-9]{12}$/)
    .messages({ 'string.pattern.base': `Phone number must have 12 digits.` })
    .required(),
});

const partnerSchema = Joi.object({
  name: Joi.string().trim().min(2).max(255).required().messages({
    'string.base': 'Name must be a string',
    'string.empty': 'Name is required',
    'string.min': 'Name should have a minimum length of {#limit}',
    'string.max': 'Name should have a maximum length of {#limit}',
    'any.required': 'Name is required',
  }),
  link: Joi.string()
    .uri({ scheme: ['http', 'https'] })
    .allow('')
    .messages({
      'string.uri': 'Link must be a valid URL',
    }),
  image: Joi.string()
    .regex(/^[a-zA-Z0-9_-]+\.[a-zA-Z]{2,4}$/)
    .messages({
      'string.pattern.base': 'Image should be a valid filename with extension',
      'any.required': 'Image is required',
    }),
});
const documentSchema = Joi.object({
  name: Joi.string().trim().min(2).max(255).optional().messages({
    'string.base': 'Name must be a string',
    'string.empty': 'Name is required',
    'string.min': 'Name should have a minimum length of {#limit}',
    'string.max': 'Name should have a maximum length of {#limit}',
    'any.required': 'Name is required',
  }),
  file: Joi.string(),
});

const eventTypeSchema = Joi.object({
  eventType: Joi.string()
    .regex(/^[\p{L}\d\s.]+$/u)
    .required()
    .messages({
      'string.pattern.base': 'eventType must be a string with only letters',
      'any.required': 'eventType is required',
    }),
  locale: Joi.string(),
});

const passwordChangeSchema = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string()
    .min(8)
    .max(32)
    .required()
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/)
    .message(
      'The new password must contain at least one number, one lowercase letter, and one uppercase letter'
    ),
  confirmPassword: Joi.ref('newPassword'),
}).with('newPassword', 'confirmPassword');

const searchQuerySchema = Joi.object({
  query: Joi.string().required().min(1).max(255),
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
  contactsSchema,
  partnerSchema,
  documentSchema,
  eventTypeSchema,
  passwordChangeSchema,
  searchQuerySchema,
};
