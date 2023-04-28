const { resolve } = require('path');
const { SerialPort, ReadlineParser } = require('serialport');
const logger = require('../logger/logger');
const BAUD_RATE = 9600
const date = new Date()
const RESPONSE_SYMBOL = 'R'
const SEND_SYMBOL = 'S'

const createTimeStamp = () => {
    return `${date.getSeconds() + date.getMilliseconds()}`
}

//ON READ TRANSFER SERIAL MESSAGE TO JSON
class SerialDevice {

    //Implement connection retrying
    constructor(path, name, messageCallback) {
        this.path = path
        this.name = name
        this.messageCallback = messageCallback;
    
        logger.info("Trying to connect to Serial Device.", { path: path })
    
        this.port = new SerialPort({ path: path, baudRate: BAUD_RATE, autoOpen: false })
        this.port.open((error) => {
            if(error) {
                logger.warn("Unable to connect to serial device! Are you sure it's plugged in?", { path: path })
                return
            }

            logger.info(`Successfully connected to serial device at path: ${path}`)
        })
    
    
        //Creating parser for serial data
        this.parser = new ReadlineParser()
        this.port.pipe(this.parser)
    
        this._messageCallbackList = new Map()
        // // this.parser.on('data', (receivedMessage) => {this._onMessage(receivedMessage)})
        //  this.parser.on('data', (receivedMessage) => {console.log("test"); console.log(receivedMessage)})
        this.parser.on('data', (receivedMessage) => {this.messageCallback(receivedMessage.toString())})
    }
    
    /**
     * 
     * @param {the message waiting to be sent} message 
     * @returns true if callback message was received from robot
     */
    sendMessage(messageBody) {
        //Creating a timestamp for our message
        let messageTimestamp = createTimeStamp()
        //Writing our message to the serial port
        let prefixedMessage = SEND_SYMBOL + ' ' + messageTimestamp + ' ' + messageBody + '\n';

        logger.info(`Sending Message to Serial Device`, {path: this.path, message: prefixedMessage})
        this.port.write(prefixedMessage)

        //Waiting for a response from our device
        return this._getMessageResponse(messageTimestamp)
    }

    /**
     * Returns the response from the serial device or times out
     * @param {*} messageTimeStamp 
     * @returns 
     */
    _getMessageResponse(messageTimeStamp) {
        const TIMEOUT_MS = 10000;

        let messagePromise = new Promise((resolve, _) => {
            this._messageCallbackList.set(messageTimeStamp, resolve)
        })

        let timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => {
                let message = this._messageCallbackList.
                logger.warn("No Response from serial device!", {path: this.path, message: message})

                this._messageCallbackList.delete(messageTimeStamp)
                reject('No response from serial device!')
            }, TIMEOUT_MS)
        })

        return Promise.race([messagePromise, timeoutPromise])
    }

    _onMessage(message) {
        logger.info("Received Message from Serial Device.", { path: this.path, message: message })
        let message_parts = message.split(' ')
        switch(message_parts[0])
        {
            case RESPONSE_SYMBOL:
                let callback = this._messageCallbackList.get(message_parts[1])
                if(callback)
                {
                    logger.debug("Message response received from serial device.", { path: this.path, message:message })
                    this._messageCallbackList.delete(message_parts[1])
                    callback(message)
                }
                else 
                    break;
                    logger.warn("SerialDevice: Received response to message that doesn't exist!", { path: this.path, message: message })
                
                break;
            case SEND_SYMBOL:
                //Sending that we received the message
                logger.debug("Sending successful response to serial device,", { path: this.path, message: message })
                this.port.write(RESPONSE_SYMBOL + ' ' + message_parts[1])
                this.messageCallback(message)
                break;
            default:
                logger.warn("Message received from serial device has no header symbol!", { path: this.path, message: message })
        }
    }
}

module.exports = SerialDevice