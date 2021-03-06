var express = require("express"),
  bodyParser = require("body-parser"),
  swaggerJsdoc = require("swagger-jsdoc"),
  swaggerUi = require("swagger-ui-express");


const cors = require('cors');
const app = express();
app.use(cors());
app.options('*', cors());  // enable pre-flight

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use("/wizard", require("./routes/wizard"));
app.use("/lobby", require("./routes/lobby"));

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Wizard API",
      version: "0.1.0",
      description:
        "The game of Wizard",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "InspiroBot",
        url: "https://github.com/inspirobot",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3003/",
      },
      {
        url: "https://game-wizard.herokuapp.com/",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use(
  "/api",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

const PORT = process.env.PORT || 3003;
app.listen(PORT);

console.debug("Server listening on port: " + PORT);