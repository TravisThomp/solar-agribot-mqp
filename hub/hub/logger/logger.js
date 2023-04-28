const buildDevLogger = require("./dev-logger")
const buildProdLogger = require("./prod-logger")

let logger = null;
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'development') {
    logger = buildDevLogger()
} else if(process.env.NODE_ENV === 'production') {
    logger = buildProdLogger()
} else {
    logger = buildDevLogger()
    logger.warn("No environmental variable for logging mode! Running as production! Consider adding it to your .env file.", { env_variable: "NODE_ENV", default_mode: "production" })
}

// logger.silly("Logging initialized");
// logger.debug("Debug an object", { make: "Ford", model: "Mustang", year: 1969 });
// logger.verbose("Returned value", { value:12});
// logger.info("Information", {
//   options: ["Lorem ipsum", "dolor sit amet"],
//   values: ["Donec augue eros, ultrices."],
// });
// logger.warn("Warning");
// logger.error(new Error("Unexpected error"));

module.exports = logger;