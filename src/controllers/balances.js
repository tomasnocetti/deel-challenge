const { Profile } = require("../model");

const getBalance = async (req, res) => {
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

module.exports = {
  getBalance,
};
