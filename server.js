require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync({ force: false, alter: true });

require("./app/routes/reuseCRUD")(app);
require("./app/routes")(app);

// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8083;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
