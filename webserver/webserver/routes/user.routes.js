/**
 * Responsible for serving user information
 */

const express = require("express")
const passport = require("passport")
const { subscribeUser } = require("../databases/users.database")
const logger = require("../util/logger/logger")
const userRouter = express.Router()

userRouter.use(passport.authenticate('jwt', { session: false }))
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       schema: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Subscription:
 *       type: object
 *       required:
 *         - robotName
 *         - subscriptionToken
 *       properties:
 *         robotName:
 *           type: string
 *           description: the robot's name
 *         subscriptionToken:
 *           type: password
 *           description: the subscription token associated with the robot
 *       example:
 *         robotName: reginald
 *         subscriptionToken: myToken
*/
/**
 * @swagger
 * /user/subscriptions:
 *  get:
 *    tags:
 *      - User
 *    security:              # <--- ADD THIS
 *      - bearerAuth: []     # <--- ADD THIS
 *    description: Returns a single person based on their JWT token
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: A single person
 *        schema:
 *            type: string
 *            description: 
 *              
 */
userRouter.get('/subscriptions', (req, res) => {
    logger.verbose("Request for user subscriptions")
    res.status(200).json({subscriptions: req.user.subscriptions})
})

/**
 * @swagger
 * /user/subscribe:
 *  post:
 *    tags:
 *      - User
 *    security:              # <--- ADD THIS
 *      - bearerAuth: []     # <--- ADD THIS
 *    description: Returns a single person based on their JWT token
 *    produces:
 *      - application/json
 *    consumes:
 *      - application/json
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
userRouter.post('/subscribe', (req, res) => {
    const email = req.user.email
    const robotName = req.body.robotName
    const subscriptionToken = req.body.subscriptionToken
    
    subscribeUser(email, robotName, subscriptionToken)
    .then((successful) => {
        //To-do improve this http error messaging
        if(!successful) {
            res.status(200).json({message : "Subscribed to robot"})
            return
        }

        res.status(200).json({message: "subscribed to robot"})
    })

    logger.verbose("Subscribe request for robot")
})

module.exports = userRouter