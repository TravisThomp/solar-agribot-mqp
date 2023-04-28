const passport = require('passport');
const serverVariables = require('../config/server.variables');
const robotsDatabase = require('../databases/robots.database');
const { getUser } = require('../databases/users.database');
const logger = require('../util/logger/logger');
const JwtStrategy = require('passport-jwt').Strategy
/**
 * Separates the jwt cookie out of the message cookie
 * @param {the request} req 
 * @returns jwt string or null
 */
const cookieExtractor = (req) => {
    logger.silly("Verifying token")
    let token = null;
    
    if(req && req.cookies)
    {
        token = req.cookies['jwt']
    }

    return token
}

const jwtOptions = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: serverVariables.JWT_SECRET
};
/**
 * This will be a request middle-wear for express
 * This will see if the user has a jwt cookie in their request, 
 * validates the jwt,
 * and finds the user associated with information stored
 */

const findRobotAccount = (name) => {
    robotsDatabase.getRobotInformation(name)
    .then(robot => {
        if(robot) {
            logger.debug("Found robot using jwy payload", robot)
            return robot
        } else {
            logger.debug("Could not find user with the jwt payload!", {robot: name})
            return false
        }
    })

}

const findUserAccount = (email) => {
    return getUser(email)
    .then(user => {
         if(user) {
            logger.debug("Found user using jwt payload!", user)
             return user
        } else {
            logger.debug("Could not find user with that jwt payload!", {email: email})
            return false
        }
    })
}

const isJwtExpired = (expiration) => {
    let now = Date.now()
    logger.verbose("Checking JWT Expiration", { now: now, expiration: expiration})
    if(now > expiration)
    {
        logger.verbose("JWT is Expired!", { now: now, expiration: expiration})
        return true
    }
    return false
}

passport.use(new JwtStrategy(
    jwtOptions, 
     (jwtPayload, done) => {
        logger.verbose("Jwt payload verified", jwtPayload)

        //Searching for robot or user
        
        if(jwtPayload.isRobot) {
            //Lookup robot
            return findRobotAccount(jwtPayload.name).then(robot => {
                return done(null, robot)
            })
        } else {
            
            //Check Expiration
            if(isJwtExpired(jwtPayload.expiration)) {
                return done(null, false)
            }

            //Lookup user
            return findUserAccount(jwtPayload.email).then(user => {
                return done(null, user)
            })
        }
    }
))
