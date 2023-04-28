const buildDevLogger = require("./dev-logger")
const buildProdLogger = require("./prod-logger")

let logger = null;

if (process.env.NODE_ENV === 'development') {
    logger = buildDevLogger()
    logger.info("Server stated in development mode")
} else {
    logger = buildProdLogger()
    logger.info("Server stated in production mode")

} 

module.exports = logger;