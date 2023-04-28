/**
 * Responsible for serving accounts
 */
const express = require("express")
const serverVariables = require("../config/server.variables")
const { getUser, addUser } = require("../databases/users.database")
const logger = require("../util/logger/logger")
const bcrypt = require('bcrypt');
const generateJWTCookie = require("../auth/jwt.cookie.writer");
const passport = require("passport");
const accountRouter = express.Router()

/**
 * @swagger
 * tags:
 *   - Testing
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       schema: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     UserCredentials:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: the user's email
 *         password:
 *           type: password
 *           description: the user's password
 *       example:
 *         email: tnthompson@wpi.edu
 *         password: ILikeFish23!
 *     UserRegister:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - rePassword
 *         - name
 *         - dob
 *       properties:
 *         email:
 *           type: string
 *           description: the user's email
 *         password:
 *           type: password
 *           description: the user's password
 *         rePassword:
 *           type: string
 *           description: the user's validation of password
 *         name:
 *           type: password
 *           description: the user's full name
 *         dob:
 *           type: string
 *           description: the user's date of birth
 *       example:
 *         email: tnthompson@wpi.edu
 *         password: ILikeFish23!
 *         rePassword: ILikeFish23!
 *         name: John Douglas
 *         dob: 11-20-2001
 */          
/**
 * @swagger
 * /login:
 *    post:
 *      tags:
 *        - Authentication
 *      summary: Verifies user credentials and provides a user access token.
 *      security:
 *        - bearerAuth: []
 *      produces:
 *        - application/json
 *      consumes:
 *        - application/json
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserCredentials'
 *      responses:
 *        200:
 *          description: Login Successful
 *          content:
 *            applications/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    description: Login Successful!
 *                example: 
 *                  message: Login Successful!
 *        403:
 *          description: Incorrect username/password combo.
 *          content:
 *            applications/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    description: Incorrect username/password combo!
 *                example: 
 *                  message: Incorrect username/password combo!
 *        500:
 *          description: Internal Server Error
 *          content:
 *            applications/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                example: 
 *                  message: Internal Server Error
 */
accountRouter.post('/login', (req, res) => {
    const credentials = {
        email: req.body.email,
        password: req.body.password
    }
    logger.verbose("Login request received", credentials)
    logger.verbose("Request Body", req.body)

    getUser(credentials.email).then((user) => {
        if(!user)
        {
            //user does not exist
            logger.debug("No user exists with email", credentials)
            res.status(401).json({message: "Invalid Email/Password combo"})
            return
        } 
    
        //Verify user password
        logger.debug("Password and hash", { credentials: credentials.password, userHash: user.hash, user: user})
        bcrypt.compare(credentials.password, user.hash)
        .then((result) => {
            if(!result) {
                logger.debug("User password incorrect", credentials)
                res.status(401).json({message: "Invalid Email/Password combo"})
                return
            } 
            generateJWTCookie(res, {email:user.email})
            .status(200)
            .json({ message: 'welcome back' })
        })
    })
})

/**
 * @swagger
 * /logout:
 *    post:
 *      tags:
 *        - Authentication
 *      summary: Logs the user out of the webpage
 *      produces:
 *        - application/json
 *      consumes:
 *        - application/json
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: string
 *      responses:
 *        200:
 *          description: User logged out.
 *          content:
 *            applications/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                example: 
 *                  message: Logged out.
 *        500:
 *          description: Internal Server Error
 *          content:
 *            applications/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                example: 
 *                  message: Internal Server Error
 */
accountRouter.post('/logout', (req, res) => {
    logger.silly("User logging out")
    if(req && req.cookies)
    {
        logger.debug("Clearing user's jwt cookie")
        res.clearCookie('jwt')
    }

    res.status(200).json({ message: "Logged out successfully"})
})


/** 
* @swagger
* /register:
*    post:
*      tags:
*        - Authentication
*      summary: Logs the user out of the webpage
*      produces:
*        - application/json
*      consumes:
*        - application/json
*      requestBody:
*        content:
*          application/json:
*            schema:
*              $ref: '#/components/schemas/UserRegister'
*      responses:
*        200:
*          description: User logged out.
*          content:
*            applications/json:
*              schema:
*                type: object
*                properties:
*                  message:
*                    type: string
*                example: 
*                  message: Logged out.
*        500:
*          description: Internal Server Error
*          content:
*            applications/json:
*              schema:
*                type: object
*                properties:
*                  message:
*                    type: string
*                example: 
*                  message: Internal Server Error
*/
accountRouter.post('/register', (req, res) => {
    let credentials = {
        email: req.body.email,
        password: req.body.password,
        rePassword:req.body.rePassword,
        name:req.body.name,
        dob:req.body.dob,
    }
    logger.debug("User registering for an account", credentials)

    if(password != rePassword) {
        res.status(500).send({ message: "Password and Repassword do not match"})
        return
    }

    //Checking if user exists with email
    getUser(credentials.email).then((account) => {
        if(account) {
            logger.debug("User with email already exists!", credentials)
            res.status(500).send({ message: "User already exists for this account! "})
            return
        }

        // To-do check password and re-password

        addUser(credentials.email, credentials.password, credentials.name, credentials.dob)
        .then((user) => {
            logger.debug("User account created successfully! Sending jwt cookie...", credentials)
            generateJWTCookie(res, {email:user.email}).status(201).send({ message: "Account created!" })
        })

    })
})

accountRouter.get('/check-logged-in', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.sendStatus(200)
})

module.exports = accountRouter