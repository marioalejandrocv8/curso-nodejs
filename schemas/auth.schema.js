const Joi = require('joi')

const email = Joi.string()
const newPassword = Joi.string().min(8);
const token = Joi.string()

const recoverySchema = Joi.object({
    email: email.required(),

})

const changePasswordSchema = Joi.object({
    newPassword: newPassword.required(),
    token:token.required()
})

module.exports = { recoverySchema, changePasswordSchema }