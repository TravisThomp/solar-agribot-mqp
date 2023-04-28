const { MongoClient, ServerApiVersion } = require('mongodb');
const serverVariables = require('../config/server.variables');
const logger = require('../util/logger/logger');
/**
 * responsuble for supplying a connection to the mongo server
 */
logger.silly("Connecting to database...")
//Connection variable setup
const uri = `mongodb+srv://${serverVariables.MONGODB_USER}:${serverVariables.MONGODB_PASS}@${serverVariables.MONGODB_HOST}`
const mongoClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

let databaseConnection = new Promise((resolve, reject) => {
    try
    {
        mongoClient.connect()
        .then(() => {
            resolve(mongoClient)
        })
    } catch(error) {
        reject(error)
    }
})


module.exports =  databaseConnection