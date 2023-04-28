/**
 * Responsible for serving the web-files to the user
 */

const express = require("express")
const logger = require("../util/logger/logger")
const indexRouter = express.Router()

indexRouter.get('/', (req, res) => {
    res.sendFile('index.html', { root: '../public/' })
})

indexRouter.use((req, res, next) => {
    //Verify Login
    
    next()
})

indexRouter.get('/dashboard', (req, res) => {
    res.sendFile('index.html', { root: '../public/' })


})

indexRouter.get('/about', (req, res) => {
    res.sendFile('index.html', { root: '../public/' })


})

indexRouter.get('/statistics', (req, res) => {
    res.sendFile('index.html', { root: '../public/' })

})

indexRouter.get('/login', (req, res) => {
    res.sendFile('index.html', { root: '../public/' })

})

indexRouter.get('/weather-report', (req, res) => {
    res.json({message:'temp'}).status(200)
})

module.exports = indexRouter