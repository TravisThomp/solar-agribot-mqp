const { Router } = require("express");

const scheduleRouter = new Router()

/**
 * @swagger
 * components:
 *   Credentials:
 *     Routine:
 *       type: object
 *       required:
 *         - time
 *         - days
 *         - maxDuration
 *         - mode
 *         - repeat
 *       properties:
 *         time:
 *           type: string
 *           description: the user's email
 *         days:
 *           type: password
 *           description: the user's password
 *         maxDuration:
 *           type: string
 *           description: the user's validation of password
 *         mode:
 *           type: String
 *           description: mode of the robot (sample, fertilize, sample and fertilize)
 *         repeat:
 *           type: string
 *           description: Interval to run routine(never, daily, weekly. monthly)
 *       example:
 *         time: 11:00:00,
 *         days: [sunday, tuesday],
 *         maxDurationMinutes: 120,
 *         mode: John Douglas,
 *         repeat: weekly,
 *          
 */

/**
 * @swagger
 * /api/scheduler/routine:
 *    post:
 *      tags:
 *        - scheduler
 *      summary: Updates the settings to the scheduler 
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
 *              $ref: '#/components/schemas/Routine'
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
scheduleRouter.post('/routine', (req, res) => {
    
})


scheduleRouter.get('/routine', (req, res) => {

})

scheduleRouter.delete('/routine', (req, res) => {

})

// scheduleRouter.post('/abort', (req, res) => {

// })


module.exports = scheduleRouter