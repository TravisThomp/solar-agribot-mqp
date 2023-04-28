const logger = require("../logger/logger");
const express = require('Express')
const morgan = require('morgan');
const hubVariables = require("../config/hub.variables");

// const morganMiddleware = morgan(
//     {
//         stream: {
//             write: (message) => logger.http(message.trim())
//         }
//     }
// )

const startServer = () => {
    logger.silly("Starting express web server...")
    app = express()
    app.use(express.json())
    // app.use(morganMiddleware)

    app.get('/api/leave-time', (req, res) => {
        try {
            res.json({name: 'travis'})
        } catch (err) {
            res.status(500).send("Internal Server Error")
        }
    })
    
    app.post('/api/leave-time', (req, res) => {
        try {

        } catch (err) {
            res.status(500).send("Internal Server Error")
        }
    })
        
    app.listen(hubVariables.EXPRESS_SERVER_PORT, () => {
        logger.info("Express server started!", { port: hubVariables.EXPRESS_SERVER_PORT })
    })
}

module.exports = startServer