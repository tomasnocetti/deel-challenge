const express = require("express");
const router = express.Router();

const { AdminController } = require("../controllers");

router.get("/best-profession", AdminController.getBestProfession);
router.get("/best-clients", AdminController.getBestClients);

module.exports = router;
