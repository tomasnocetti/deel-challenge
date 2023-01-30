const express = require("express");
const router = express.Router();

const { JobsController } = require("../controllers");

router.get("/", JobsController.get);

module.exports = router;
