const { Op } = require("sequelize");

const CONTRACT_STATUS = {
  TERMINATED: "terminated",
  IN_PROGRESS: "in_progress",
  NEW: "new",
};

const getContract = async (req, res) => {
  const { Contract } = req.app.get("models");
  const { id } = req.params;

  const contract = await Contract.findOne({
    where: {
      id,
      [Op.or]: [{ ClientId: req.profile.id }, { ContractorId: req.profile.id }],
    },
  });

  if (!contract) return res.status(404).end();

  res.json(contract);
  return;
};

const getNonTerminatedContracts = async (req, res) => {
  const { Contract } = req.app.get("models");

  const contracts = await Contract.findAll({
    where: { ClientId: req.profile.id, status: CONTRACT_STATUS.IN_PROGRESS },
  });

  res.json(contracts);
  return;
};

module.exports = {
  getContract,
  getNonTerminatedContracts,
};
