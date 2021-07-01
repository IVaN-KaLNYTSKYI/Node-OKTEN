const Joi = require('joi');

const { regexpEnum } = require('../../constants');

module.exports = Joi.object({
    name: Joi.string()
        .alphanum()
        .trim()
        .min(2)
        .max(50),
    age: Joi.number()
        .integer()
        .min(0)
        .max(120),
    email: Joi.string()
        .regex(regexpEnum.EMAIL_REGEXP)
        .required(),
    password: Joi.string()
        .regex(regexpEnum.PASSWORD_REGEXP)
        .trim()
        .required(),
});
