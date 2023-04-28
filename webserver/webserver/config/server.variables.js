/**
 * This is responsible for checking environment variables and setting default values if they do not exist
 */


require('dotenv').config('')
const logger = require('../util/logger/logger')

logger.silly("Loading Server Variables")

const defaults = {
    NODE_ENV: 'production',
    PORT: 3000,
    MONGODB_HOST: 'none',
    MONGODB_USER: 'test',
    MONGODB_PASS: 'pass',
    JWT_SECRET: 'SECRET',
    JWT_EXPIRATION_MS: '1000000000',
    HASH_SALT_ROUNDS: 10
}

let variables = {}

for (const [variableName, defaultValue] of Object.entries(defaults)) {
    let value = process.env[variableName]
    if(!value) {
        value = defaultValue
        logger.warn("No environmental variable set! Using default value.", { variable: variableName, defaultValue: defaultValue})    
    }
    variables[variableName] = value
}

module.exports = Object.freeze(variables)