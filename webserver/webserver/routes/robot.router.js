const express = require('express')
const passport = require('passport')
const generateJWTCookie = require('../auth/jwt.cookie.writer')
const robotRouter = express.Router()
const logger = require('../util/logger/logger')
const { getAllSampleDates, getAllSamples, getRobotInformation, addSample } = require('../databases/robots.database')

robotRouter.get("/gen-jwt", (req, res) => {
    let payload = {
        isRobot: true,
        name: "reginald",
    }
    generateJWTCookie(res, payload)
    .status(200)
    .json({})
})

robotRouter.use(passport.authenticate('jwt', { session: false }))

// robotRouter.use(passport.authenticate('jwt', { session: false }))

robotRouter.get('/scheduling-updates', (req, res) => {
    res.status(200).json({message:"sent"})
})

robotRouter.post('/update-location', (req, res) => {
    res.status(200).json({message:"sent"})
})

robotRouter.post('/update-status', (req, res) => {
    res.status(200).json({message:"sent"})
})

robotRouter.post('/add-soil-data', (req, res) => {
    logger.debug("Robot Soil Sample Received", {body: req.body})

    addSample("reginald", req.body)
    //add to database

    res.status(200).json({message:"sent"})
})

module.exports = robotRouter


