const { Op } = require("sequelize");
const { CONTRACT_STATUS } = require("../constants");

const getUnpaidJobs = async (req, res) => {
  const { Job, Contract } = req.app.get("models");
  try {
    const jobs = await Job.findAll({
      where: {
        paid: false,
      },
      include: {
        model: Contract,
        where: {
          status: CONTRACT_STATUS.IN_PROGRESS,
          [Op.or]: [
            { ClientId: req.profile.id },
            { ContractorId: req.profile.id },
          ],
        },
      },
    });

    res.json(jobs);
    return;
  } catch (err) {
    res.status(500).end();
  }
};

module.exports = {
  getUnpaidJobs,
};
