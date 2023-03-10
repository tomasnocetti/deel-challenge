const { Op } = require("sequelize");
const { MAX_BALANCE_RATIO } = require("../constants");

const getBalance = async (req, res) => {
  try {
    const { Profile } = req.app.get("models");
    const { userId } = req.params;

    const profile = await Profile.findOne({
      where: {
        id: userId,
      },
    });

    if (!profile) return res.status(404).json({});

    res.json({
      balance: profile.balance,
    });
    return;
  } catch (err) {
    res.status(500).end();
  }
};

const addToBalance = async (req, res) => {
  try {
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

    await sequelize.transaction(async (t) => {
      const unpaidTotal = await Job.sum("price", {
        where: {
          paid: {
            [Op.not]: true,
          },
        },
        include: {
          model: Contract,
          where: { ClientId: userId },
        },
        transaction: t,
      });

      if (unpaidTotal * MAX_BALANCE_RATIO < balanceToAdd) {
        res.status(400).json({
          error: "INVALID_AMOUNT_TO_DEPOSIT",
        });
        return;
      }

      await profile.increment("balance", { by: 100, transaction: t });
    });
    res.status(201).json({});
  } catch (err) {
    res.status(500).end();
    return;
  }
};

module.exports = {
  getBalance,
  addToBalance,
};
