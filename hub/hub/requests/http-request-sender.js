const logger = require('../logger/logger')
const { saveJsonData } = require('./local-storage/emergency-data-storage')
const axios = require('axios')
const hubVariables = require('../config/hub.variables')
//Web Server connection setup

const routes = Object.freeze({
    ADD_SAMPLE_ROUTE: hubVariables.WEB_SERVER_API_LINK
    + '/rover/add-sample'
})



// const runRequestLoop = () => {
//     setTimeout(() => {
//         module.send        
//         runRequestLoop()
//     }, 1000)
// }

// sendRequest(type, )
logger.silly("Setting jwt cookie header")
axios.defaults.headers.common['Cookie'] = 'jwt=' + hubVariables.JWT_TOKEN

//Axios adding Cookie to header

module.exports = {
    getScheduleUpdate: () => {
        logger.http("Sending message to webserver", { endpoint: hubVariables.WEB_SERVER_API_LINK + '/robot/scheduling-updates' })

        axios.get(hubVariables.WEB_SERVER_API_LINK + '/robot/scheduling-updates')
            .then((res) => {
                logger.http("Successful response for schedule update check", { name: "Schedule Update Check", body: res.body })
                let updates = res.body.updates
                //To-Do send out updates
                // logger.info("send schedule update check", response)
                
            })
            .catch(error => {
                logger.warn("Failed to send message to Web Server!")
                //ADD TO EMERGENVY DATA STORAGE IF NEEDED
            })
    },

    postSoilSample: (soilSample) => {
        logger.debug("Posting Soil Sample...")
        axios.post(hubVariables.WEB_SERVER_API_LINK + "/robot/add-soil-data", soilSample)
            .then((res) => {
                logger.http("Successful response for soil data post", {body: res.body})
            })
            .catch(error => {
                logger.error("Failed to post soil data to webserver", error)
            })
    },

    postStatusUpdate: (longitude, latitude, status) => {
        body = {
            longitude: longitude,
            latitude: latitude,
            status: status,
        }

        axios.post(hubVariables.WEB_SERVER_API_LINK + "/robot/status-update", body)
            .then((res) => {
                logger.http("Status Update Response From Server", {body: res.body})
            })
            .catch(error => {
                logger.warn("Failed to send message to Web Server!")
            })
    },    
}