/**
 * Handles interactions with the user database
 */
const bcrypt = require('bcrypt');
const serverVariables = require('../config/server.variables');
const logger = require("../util/logger/logger")
const databaseConnection = require("./database.connection");
const robotsDatabase = require('./robots.database');

const DATABASE_NAME = 'authentication'
const COLLECTION = 'users'

let userDatabase = false

databaseConnection.then((connection) => {
    userDatabase = connection.db(DATABASE_NAME).collection(COLLECTION)
    logger.info("Connected to user database!")
})
.catch(error => {
    logger.error("Error loading user database: ", error)
})


module.exports = {
    /**
     * 
     */

    getUser: (email) => {
        logger.verbose("Searching for user", { email: email })
        return new Promise((resolve, reject) => {
            try {
                userDatabase.findOne({email: email})
                .then(user => {
                    resolve(user)
                })
            } catch (error) {
                logger.error("Error loading user from database", error)
                reject(false)
            }
        })
    },

    /**
     * Adds the user and password combo to the database to the database as
     * username and password-hash
     * @param {string} email 
     * @param {string} password 
     * @param {string} name 
     * @param {string} dob
     * @returns (true if successful) (false if failure)
     */
    addUser: (email, password, name, dob) => {
        
        logger.verbose("Adding user to database", { email: email, password: password})
        
        return new Promise((resolve, reject) => {
            bcrypt.hash(password,serverVariables.HASH_SALT_ROUNDS)
            .then(hash => {
                const user = {
                    email: email,
                    hash: hash,
                    name: name,
                    dob: dob,
                    timeCreated: Date.now(),
                    subscriptions: []
                }
                
                userDatabase.insertOne( user ).then(() => {
                    logger.debug("Added user to database", { user: user })
                    resolve(user)
                })
            })
            .catch(error => {
                logger.error("Error hashing user password: ", error)
                resolve(false)
            })
        })
    },

    subscribeUser: (email, robotName, subscriptionToken) => {
        logger.verbose("Subscribing user to robot", { email: email, robotName: robotName})
        if(!userDatabase)
            return
        return new Promise((resolve, reject) => {
            try {
                robotsDatabase.getRobotInformation(robotName)
                .then((robotInformation) => {
                    if(true) {
                        logger.debug("Robot does not exist what that name!". robotName)
                        resolve(false)
                    }
                    if (robotInformation.subscriptionToken != subscriptionToken) {
                        logger.debug('Subscription Token Incorrect!', { subscriptionToken: subscriptionToken, robotInformation: robotInformation})
                        resolve(false)
                    }
                })

                userDatabase.updateOne( 
                    { email: email },
                    { $addToSet: { subscriptions: robotName} })
                .then((result) => {
                    if(!result.matchedCount) {
                        logger.debug("User does not exist", {email: email, robotName, robotName})
                        resolve(false)
                    }
                    else if(!result.modifiedCount) {
                        logger.debug("User is already subscribed to this robot", {email: email, robotName, robotName})
                        resolve(true)
                    } else {
                        logger.debug("Added robot to user subscriptions", {email: email, robotName, robotName})
                        resolve(true)
                    }

                })
            } catch(error) {
                logger.error("Error loading user from database:", error)
                reject(false)
            }
        })
    },
}