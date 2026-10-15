const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_out.json'
const endpointsFiles = ['./routes/route.js']

swaggerAutogen(outputFile, endpointsFiles).then(() =>{
    require("./index.js")
})