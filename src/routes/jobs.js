const express = require("express");
const router = express.Router();

const { JobsController } = require("../controllers");

router.get("/unpaid", JobsController.getUnpaidJobs);
router.post("/:job_id/pay", JobsController.payForJob);

module.exports = router;
