const SerialDevice = require("./serial-device");
const { sendAddSampleRequest } = require("../requests/http-request-sender");
const logger = require("../logger/logger");
const httpRequestSender = require("../requests/http-request-sender")


const EVENTS = {
    SOIL_SAMPLE: 'SoilSampleMessage'
}

const onSoilSampleMessage = (splitMessage) => {
    //NOT DONE
    soilSample = {

    }
    sendAddSampleRequest(soilSample);
}

const onMessage = (message) => {
    try {
        let messageWoEnding = message.trim().replace(/[^\x20-\x7E]/g, '')
        messageWoEnding += "}"
       
        let jsonMessage = JSON.parse(messageWoEnding)
        
        //to do 
        //Format message
        //send to webserver
        let soilData = {
            temperature: jsonMessage.sd.t,
            humidity: jsonMessage.sd.h,
            conductivity: jsonMessage.sd.c,
            ph: jsonMessage.sd.ph,
            nitrogen: jsonMessage.sd.n,
            phosphorous: jsonMessage.sd.p,
            potassium: jsonMessage.sd.k,
        }

        let formattedMessage = {
            id: 0,
            time : jsonMessage.t,
            longitude : jsonMessage.lon,
            latitude : jsonMessage.lat,
            soilData : soilData,
        }

        httpRequestSender.postSoilSample(formattedMessage)

    } catch(error) {
        logger.error(error)
    }
    //Send to database

}

let transmitter = new SerialDevice('/dev/ttyACM0', 'transmitter', onMessage)

module.exports = {

    /**
     * 
     * @returns  Promise of transmitter response or timeout
     */
    sendCheckUpMessage: () => {
        let message = "CU"
        logger.debug("Transmitter sending message", {message: message})
        return transmitter.sendMessage(message)
    },

     /**
     * 
     * @returns Promise of transmitter response or timeout
     */
    sendReturnHomeMessage: () => {
        let message = "RH"
        logger.debug("Transmitter sending message", {message: message})
        return transmitter.sendMessage(message)
    },

    /**
     * 
     * @returns Promise of transmitter response or timeout
     */
    sendGoOutMessage: () => {
        let message = "GO"
        logger.debug("Transmitter sending message", {message: message})
        return transmitter.sendMessage(message)
    },
}