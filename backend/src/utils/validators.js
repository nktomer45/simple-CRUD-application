const Joi = require('joi');
const userValidator = Joi.object({
  user: Joi.string().required().messages({
    'string.empty': 'Username cannot be empty',
    'any.required': 'Username is required'
  }),
  interest: Joi.array().items(Joi.string()).default([]),
  age: Joi.number().integer().min(0).max(120).required().messages({
    'number.base': 'Age must be a number',
    'number.integer': 'Age must be an integer',
    'number.min': 'Age must be at least 0',
    'number.max': 'Age cannot exceed 120',
    'any.required': 'Age is required'
  }),
  mobile: Joi.number().integer().required().messages({
    'number.base': 'Mobile number must be a number',
    'number.integer': 'Mobile number must be an integer',
    'any.required': 'Mobile number is required'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'any.required': 'Email is required'
  })
});

module.exports = {
  userValidator
};
