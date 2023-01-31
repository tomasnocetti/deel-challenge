const { Op } = require("sequelize");
const { CONTRACT_STATUS } = require("../constants");

const getUnpaidJobs = async (req, res) => {
  const { Job, Contract } = req.app.get("models");
  try {
    const jobs = await Job.findAll({
      where: {
        paid: {
          [Op.not]: true,
        },
      },
      include: {
        model: Contract,
        attributes: ["ContractorId", "ClientId"],
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

const payForJob = async (req, res) => {
  const { Job, Contract, Profile } = req.app.get("models");
  const sequelize = req.app.get("sequelize");
  const { job_id } = req.params;
  try {
    const job = await Job.findOne({
      where: {
        paid: {
          [Op.not]: true,
        },
        id: job_id,
      },
      include: {
        model: Contract,
        attributes: ["ContractorId", "ClientId"],
        where: {
          ClientId: req.profile.id,
        },
      },
    });

    if (!job) {
      return res.status(404).end();
    }

    const contractor = await Profile.findOne({
      where: { id: job.Contract.ContractorId },
    });

    const jobPrice = job.price;

    if (contractor.balance < jobPrice) {
      return res.status(400).json({ error: "BALANCE_LOW" });
    }

    await sequelize.transaction(async (t) => {
      await contractor.increment("balance", { by: jobPrice, transaction: t });
      await req.profile.decrement("balance", { by: jobPrice, transaction: t });

      await job.update(
        {
          paid: true,
        },
        { transaction: t }
      );
    });

    res.status(201).end();
    return;
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};

module.exports = {
  getUnpaidJobs,
  payForJob,
};
