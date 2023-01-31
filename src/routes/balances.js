const express = require("express");
const router = express.Router();

const { BalancesController } = require("../controllers");

router.post("/deposit/:userId", BalancesController.addToBalance);
router.get("/:userId", BalancesController.getBalance);

module.exports = router;
