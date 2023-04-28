//Load the logger and Server Variables
const serverVariables = require("./config/server.variables");
const logger = require("./util/logger/logger");

const express = require('express');
const morgan = require('morgan')
const cors = require('cors')

const cookieParser = require('cookie-parser')

const databaseConnection = require("./databases/database.connection");
const usersDatabase = require("./databases/users.database");
const robotsDatabase = require("./databases/robots.database");
require('./auth/passport')
const { serve, specs } = require("./config/swagger.config");
const accountRouter = require("./routes/account.router");
const userRouter = require("./routes/user.routes");
const indexRouter = require("./routes/index.routes");
const samplesRouter = require("./routes/samples.router");
const robotRouter = require("./routes/robot.router");
const path = require('path')


//Connect to the database

/**
 * Express middlewear setup
 */
databaseConnection.then(() => {
    logger.silly("Configuring Express")
    const app = express()
    app.use(cors())
    // app.use(cors({credentials: true}));
    // app.use(function(req, res, next) {
    //     res.header("Access-Control-Allow-Origin", 'http://localhost:3000');
    //     res.header("Access-Control-Allow-Credentials", true);
    //     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    //     res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    //     next();
    // });
    //Setting up logging middleware
    // if(serverVariables.NODE_ENV == 'development')
    //     app.use(morgan(":method :url :status :response-time ms - :[content-length]"))
    // else
    //     app.use(morgan("common"))

    app.use(express.json())
    app.use(cookieParser())
    //Static file serving


    app.use('/robot/', robotRouter)
    app.use('/user/', userRouter)
    app.use('/samples', samplesRouter)

    
    app.use('/', indexRouter)
    app.use('/',  accountRouter)
    app.use(express.static(path.join(__dirname, '..', 'public')));

    if(serverVariables.NODE_ENV == 'development') {
        logger.silly("Creating swagger API route", { route: '/api-docs' })
        app.use('/api-docs', serve, specs)
    }


    app.listen(serverVariables.PORT, () => {
        logger.info("Server started!", { port: serverVariables.PORT })
    })
})
