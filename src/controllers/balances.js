const { Op } = require("sequelize");
const { MAX_BALANCE_RATIO } = require("../constants");

const getBalance = async (req, res) => {
  const { Profile } = req.app.get("models");
  const { userId } = req.params;

  const profile = await Profile.findOne({
    where: {
      id: userId,
    },
  });

  if (!profile) return res.status(404).end();

  res.json({
    balance: profile.balance,
  });
  return;
};

const addToBalance = async (req, res) => {
  const { Profile, Job, Contract } = req.app.get("models");
  const sequelize = req.app.get("sequelize");
  const { userId } = req.params;
  const profile = await Profile.findOne({
    where: {
      id: userId,
    },
  });

  const balanceToAdd = Number(req.body.amount);

  if (isNaN(balanceToAdd) || balanceToAdd < 0) {
    return res.status(400).json({
      error: "INVALID_BALANCE_DEPOSIT",
    });
  }

  try {
    await sequelize.transaction(async (t) => {
      const unpaidTotal = await Job.sum("price", {
        where: {
          paid: {
            [Op.not]: true,
          },
        },
        include: {
          model: Contract,
          where: { ClientId: req.profile.id },
        },
        transaction: t,
      });

      if (unpaidTotal * MAX_BALANCE_RATIO < balanceToAdd) {
        res.status(400).json({
          error: "INVALID_BALANCE_DEPOSIT",
        });
        return;
      }

      await profile.increment("balance", { by: 100, transaction: t });
    });
  } catch (err) {
    res.status(500).end();
    return;
  }

  res.status(201).end();
};

module.exports = {
  getBalance,
  addToBalance,
};
