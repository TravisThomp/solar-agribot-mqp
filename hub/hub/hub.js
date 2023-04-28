//Enable Environmental Variables

const logger = require("./logger/logger");
logger.info('Starting the Hub...')


// const hubVariables = require("./config/hub.variables");
// const beginRobotScheduler = require('./schedulers/robot-scheduler');
// const startServer = require('./web/express.web.application');
// const httpRequestSender = require("./requests/http-request-sender");
const transmitter = require("./devices/transmitter");

// httpRequestSender.sendScheduleUpdateCheck()


// // beginRobotScheduler()


// logger.error('This is an error!')
// logger.warn('This is a warning!')
// logger.info('This is some information!')
// logger.http('This is an HTTP event!')
// logger.verbose('This is a verbose?')
// logger.debug('This is a debug!')
// console.log('dsa')
// logger.silly('I\', a goose!')

// const express = require("express")
// const cors = require('cors')
// const path = require('path')
// require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
// const logger = require('./util/logger');
// const transmitter = require("./devices/transmitter")

// const { saveJsonData, countStoredFiles, getFirstFile, getFirstStoredData } = require("./requests/local-storage/EmergencyDataStorage");
// const WebServerRequests = require("./requests/HTTPRequestSender");


// // setTimeout(() => {
//     transmitter.sendCheckUpMessage()
//     .then(console.log)
//     .catch(error => {
//         logger.log("No message response given :(")
//     })
// }, 2000)




// let soilSample = {
//     sampleDateTime: "12-06-2022 10:00:00",
//     longitude: 42.273656,
//     latitude: -71.811624,
//     soilData: {
//         temperature: 55,
//         humidity: 56,
//         conductivity:57,
//         ph: 7,
//         nitrogen: 1000,
//         phosphorous: 2000,
//         potassium: 3000
//     }
// }

// WebServerRequests.sendAddSampleRequest(soilSample).then(console.log)

// getFirstStoredData().then(console.log)