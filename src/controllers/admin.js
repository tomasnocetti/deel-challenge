const { parse, isValid, startOfDay, endOfDay } = require("date-fns");
const { Op } = require("sequelize");
const { DATE_FORMAT } = require("../constants");

const getBestProfession = async (req, res) => {
  try {
    const { Profile, Job, Contract } = req.app.get("models");
    const sequelize = req.app.get("sequelize");

    const { start_date, end_date } = req.query;

    const parsedStartDate = parse(start_date, DATE_FORMAT, new Date());
    const parsedEndDate = parse(end_date, DATE_FORMAT, new Date());

    if (!isValid(parsedStartDate)) {
      return res.status(400).send({
        error: `INVALID_START_DATE Format ${DATE_FORMAT}`,
      });
    }

    if (!isValid(parsedEndDate)) {
      return res.status(400).send({
        error: `INVALID_END_DATE - Format ${DATE_FORMAT}`,
      });
    }

    /** {raw: true} is used to remove contract.id from select clause. */

    const result = await Job.findAll({
      attributes: [[sequelize.fn("sum", sequelize.col("price")), "earnings"]],
      limit: 1,
      order: [["earnings", "DESC"]],
      group: ["Contract.ContractorId"],
      raw: true,
      where: {
        paid: true,
        paymentDate: {
          [Op.lte]: endOfDay(parsedEndDate),
          [Op.gte]: startOfDay(parsedStartDate),
        },
      },
      include: {
        attributes: ["ContractorId"],
        model: Contract,
        required: true,
        include: {
          attributes: ["profession"],
          model: Profile,
          required: true,
          as: "Contractor",
        },
      },
    });

    res.status(200).json({
      earnings: result[0]?.earnings,
      profession: result[0]?.["Contract.Contractor.profession"],
    });
    return;
  } catch (err) {
    res.status(500).end();
  }
};

module.exports = {
  getBestProfession,
};
