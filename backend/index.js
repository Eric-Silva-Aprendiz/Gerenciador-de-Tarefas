const express = require('express');
const cors = require('cors');
const rotas = require("./routes/route.js");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const port = 3000;
const app = express();

const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger_out.json');

app.use(bodyParser.json());
app.use(cors({
    origin: ["http://localhost:3001"],
    methods: ["GET", "POST", "PUT", "DELETE"], 
    credentials: true
}
))
app.use(express.json())
app.use(cookieParser())
app.use("/api/users/", rotas);
app.use("/api-docs/", swaggerUi.serve, swaggerUi.setup(swaggerDocument))


let server = app.listen(port, () => console.log(`SERVIDOR PRONTO PORTA: ${port}`));

module.exports = server;