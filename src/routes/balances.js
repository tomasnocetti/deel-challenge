const express = require("express");
const router = express.Router();

const { BalancesController } = require("../controllers");

// router.post("/balances/deposit/:userId", BalancesController.deposit);
router.get("/:userId", BalancesController.getBalance);

module.exports = router;
