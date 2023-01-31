const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");

const { getProfile } = require("./middleware/getProfile");
const { contracts, jobs, balances, admin } = require("./routes");
const { sequelize } = require("./model");

const app = express();
app.use(helmet());

app.use(bodyParser.json());

app.set("sequelize", sequelize);
app.set("models", sequelize.models);

app.use("/contracts", getProfile, contracts);
app.use("/jobs", getProfile, jobs);
app.use("/balances", balances);
app.use("/admin", admin);

module.exports = app;
