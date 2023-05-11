const { Portfolio, PortfolioStock } = require("../models/models");
const jwt = require("jsonwebtoken");

module.exports = async function (req, res, next) {
    try {
        const { id } = req.params;
        const user = req.user;
        const userPortfolio = await Portfolio.findOne({ where: { userId: user.id } });
        const stockItem = await PortfolioStock.findOne({ where: { portfioloId: userPortfolio.id, stockId: id } });

        if ( stockItem ) {
            return next()
        }

        return res.code(404).json("Not found")
    } catch (e) {
        res.json(e);
    }
};
