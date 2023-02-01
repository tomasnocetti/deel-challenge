const { Op } = require("sequelize");
const { CONTRACT_STATUS } = require("../constants");

const getContract = async (req, res) => {
  try {
    const { Contract } = req.app.get("models");
    const { id } = req.params;

    const contract = await Contract.findOne({
      where: {
        id,
        [Op.or]: [
          { ClientId: req.profile.id },
          { ContractorId: req.profile.id },
        ],
      },
    });

    if (!contract) return res.status(404).json({});

    res.json(contract);
    return;
  } catch (err) {
    res.status(500).end();
  }
};

const getNonTerminatedContracts = async (req, res) => {
  try {
    const { Contract } = req.app.get("models");

    const contracts = await Contract.findAll({
      where: {
        [Op.or]: [
          { ClientId: req.profile.id },
          { ContractorId: req.profile.id },
        ],
        status: CONTRACT_STATUS.IN_PROGRESS,
      },
    });

    res.json(contracts);
    return;
  } catch (err) {
    res.status(500).end();
  }
};

module.exports = {
  getContract,
  getNonTerminatedContracts,
};
