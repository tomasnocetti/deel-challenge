const express = require("express");
const router = express.Router();

const { AdminController } = require("../controllers");

router.get("/best-profession", AdminController.getBestProfession);

module.exports = router;
