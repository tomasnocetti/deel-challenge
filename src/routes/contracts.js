const express = require("express");
const router = express.Router();

const { ContractsController } = require("../controllers");

router.get("/:id", ContractsController.getContract);
router.get("/", ContractsController.getNonTerminatedContracts);

module.exports = router;
