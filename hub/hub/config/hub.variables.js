/**
 * This is responsive for checking environment variables and setting default values if they do not exist
 */
const dotenv = require('dotenv');
dotenv.config({path:__dirname+'/./../../.env'});
const logger = require("../logger/logger");

logger.silly("Loading Hub Variables")

const defaults = {
    NODE_ENV: 'production',
    WEB_SERVER_API_LINK: 'http://localhost:3000',
    ROBOT_NAME: 'reginald',
    JWT_TOKEN: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc1JvYm90Ijp0cnVlLCJuYW1lIjoicmVnaW5hbGQiLCJpYXQiOjE2NzEwODU0MTN9.e_XSbMeBmTCfixCzVZhsYYqNnmlyYAtb5ERcMNL3DIc',

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