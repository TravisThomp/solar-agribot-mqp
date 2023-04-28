const Joi = require('joi')
const schemas = {
    userCredential: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required()
    })
}

module.exports = schemas