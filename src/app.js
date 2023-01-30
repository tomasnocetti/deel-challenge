const express = require("express");
const bodyParser = require("body-parser");

const { getProfile } = require("./middleware/getProfile");
const { contracts, jobs } = require("./routes");
const { sequelize } = require("./model");

const app = express();

app.use(bodyParser.json());

app.set("sequelize", sequelize);
app.set("models", sequelize.models);

app.use("/contracts", getProfile, contracts);
app.use("/jobs", getProfile, jobs);

module.exports = app;
