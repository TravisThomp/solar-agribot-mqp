const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "Solar Agribots Web Server",
            version: "1.0.0",
            description: "This REST api is for accessing files stored on the MongoDB",
        },
        components: {
            securitySchemes: {
              bearerAuth: {
                type: 'cookie',
                scheme: 'bearer',
                bearerFormat: 'JWT',
              }
            }
          },
          security: [{
            bearerAuth: []
          }],
        servers: [

        ],
    },
    apis: ["./routes/*.js"],
    
}
const specs = swaggerJsDoc(options)

module.exports = {
    serve: swaggerUI.serve,
    specs: swaggerUI.setup(specs)
}
