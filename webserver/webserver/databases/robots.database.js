/**
 * Handles interactions with the user database
 */
const serverVariables = require('../config/server.variables');
const logger = require("../util/logger/logger")
const databaseConnection = require("./database.connection")
const ROBOT_INFORMATION_COLLECTION = 'information'

connection = false
databaseConnection.then((_connection) => connection = _connection)

module.exports = {
    getAllSamples: (robotName, date) => {
        return new Promise((resolve, reject) => {
            try {
                let collection = connection.db(robotName).collection(date)
                collection.find()
                    .toArray()
                    .then(dates => {
                        logger.debug("Retrieved soil sample dates from database")
                        resolve(dates)
                    })
            } catch (error) {
                logger.error("Error retrieving samples from database", error)
                reject(error)
            }

        })

    },

    getAllSampleDates: (robotName) => {
        return new Promise((resolve, reject) => {
            try {
                let database = connection.db(robotName)
                database.listCollections()
                    .toArray()
                    .then(collections => collections.map(collection => collection.name))
                    .then(datesList => datesList.filter(name => name != 'about'))
                    .then(datesList => {
                        logger.debug("Retrieved all samples dates for robot from database", { robotName: robotName, datesList: datesList })
                        resolve(datesList)
                    })
            } catch (error) {
                logger.error("Error retrieving sample dates from database", error)
                reject(error)
            }
        })
    },

    getRobotInformation: (robotName) => {
        return new Promise((resolve, reject) => {
            try {
                let database = connection.db(robotName)
                let collection = database.collection('about')
                collection.findOne()
                    .then((result) => {
                        logger.debug("Retrieved robot information", result)
                        resolve(result)
                    })
            } catch (error) {
                logger.error("Error retrieving robot data")
                reject(error)
            }

        })
    },

    //TO-DO 
    addSample: (robotName, soilSample) => {

        const getDate = () => {
            const today = new Date()

            const day = today.getDay().toString().padStart(2, '0')
            const month = (today.getMonth() + 1).toString().padStart(2, '0')
            const year = today.getFullYear().toString()
            const formattedDate = `${day}-${month}-${year}`

            return formattedDate.toString()
        }

        const date = getDate()

        logger.debug("Adding soil sample", { date: date })

        return new Promise((resolve, reject) => {

            let database = connection.db(robotName)
            let collection = database.collection(date)

            collection.count()
                .then(count => {
                    soilSample.id = count + 1;

                    collection.insertOne(soilSample)
                        .then(() => {
                            logger.debug("Added soil sample to database", { soilSample: soilSample })

                            resolve(soilSample)
                        })
                })
        })
    },

    //TO-DO
    addRobot: (robotName, password, subscriptionToken) => {

    }
}