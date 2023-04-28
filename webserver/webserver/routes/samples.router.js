/**
 * Responsible for serving sample information
 */
const express = require('express')
const passport = require('passport')
const { getAllSampleDates, getAllSamples, getRobotInformation, addSample } = require('../databases/robots.database')
const logger = require('../util/logger/logger')
const samplesRouter = express.Router()


/**
 * @swagger
 * /samples/{robotName}/{date}:
 *  post:
 *    tags:
 *      - Samples
 *    description: Returns a single person based on their JWT token
 *    produces:
 *      - application/json
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: robotName
 *        required: true
 *        schema:
 *          type: string
 *      - in: path
 *        name: date
 *        required: true
 *        schema:
 *          type: string
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Subscription'
 *    responses:
 *      200:
 *        description: A single person
 *        schema:
 *            type: string
 *            description: t
 *              
 */
samplesRouter.post('/:robotName/:date', (req, res) => {
    //Add sample to database
    //To-do Verify inputs
    const robotName = req.params.robotName
    const date = req.params.date
    const securityKey = req.body.securityKey
    const soilSample = req.body.soilSample

    getRobotInformation(robotName).then(robotInformation => {
        if(!robotInformation)
        {
            logger.debug("No robot exists with that name", robotName)
            res.status(400).json({message: "No robot exists with that name"})
            return
        }

        //To-do replace with hashed key
        if(robotInformation.securityKey != securityKey)
        {
            logger.debug("Incorrect robot security key", {attempt: securityKey, actual: robotInformation.securityKey})
            res.status(403).json({message: "You are not authorized to perform this action."})
            return
        }

        addSample(robotName, date, soilSample).then((result) => {
            res.send(200).json({message: "Sample added successfully"})
        })


    })

    res.status(200).json({message:"passed"})
})

//User authentication middleware
samplesRouter.use(passport.authenticate('jwt', { session: false }))

/**
 * @swagger
 * /samples/{robotName}:
 *  get:
 *    tags:
 *      - Samples
 *    security:              # <--- ADD THIS
 *      - bearerAuth: []     # <--- ADD THIS
 *    description: Returns a single person based on their JWT token
 *    produces:
 *      - application/json
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: robotName
 *        required: true
 *        schema:
 *          type: string
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Subscription'
 *    responses:
 *      200:
 *        description: A single person
 *        schema:
 *            type: string
 *            description: t
 *              
 */
samplesRouter.get('/:robotName', (req, res) => {
    const robotName = req.params.robotName
    logger.verbose("Samples Request", { robotName: robotName })
    
    //To-Do Test
    getAllSampleDates(robotName).then(sampleDates => {
        res.status(200).send({dates: sampleDates})
    })
})

/**
 * @swagger
 * /samples/{robotName}/{date}:
 *  get:
 *    tags:
 *      - Samples
 *    security:              # <--- ADD THIS
 *      - bearerAuth: []     # <--- ADD THIS
 *    description: Returns a single person based on their JWT token
 *    produces:
 *      - application/json
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: robotName
 *        required: true
 *        schema:
 *          type: string
 *      - in: path
 *        name: date
 *        required: true
 *        schema:
 *          type: string
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Subscription'
 *    responses:
 *      200:
 *        description: A single person
 *        schema:
 *            type: string
 *            description: t
 *              
 */
samplesRouter.get('/:robotName/:date', (req, res) => {
    const robotName = req.params.robotName
    const date = req.params.date
    //To-Do test
    getAllSamples(robotName, date).then(samples => {
        res.status(200).json({samples: samples})
    })
})

module.exports = samplesRouter