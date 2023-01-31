const express = require("express");
const router = express.Router();

const { JobsController } = require("../controllers");

router.get("/unpaid", JobsController.getUnpaidJobs);

module.exports = router;
