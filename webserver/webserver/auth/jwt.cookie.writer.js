const jwt = require("jsonwebtoken");
const serverVariables = require("../config/server.variables");

const generateJWTCookie = (res, payload) => {

    const token = jwt.sign(payload, serverVariables.JWT_SECRET)
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: serverVariables.NODE_ENV == 'production'
    })
    return res
}

module.exports = generateJWTCookie 
