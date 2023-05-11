const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const { Portfolio, PortfolioStock, Stock } = require("../models/models");

class PortfolioController {
    async addStock(req, res) {
        try {
            const { id } = req.body;
            console.log(id)
            const token = req.headers.authorization.split(" ")[1];
            const user = jwt.verify(token, process.env.SECRET_KEY);
            const portfolio = await Portfolio.findOne({ where: { userId: user.id } });
            await PortfolioStock.create({ portfolioId: portfolio.id, stockId: id });
            return res.json({ message: "success" });
        } catch (e) {
            console.log(e);
        }
    }

    async getStocks(req, res) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const user = jwt.verify(token, process.env.SECRET_KEY);
            const { id } = await Portfolio.findOne({ where: { userId: user.id } });
            const portfolio = await PortfolioStock.findAll({ where: { portfolioId: id } });

            const portfolioArr = [];
            for (let i = 0; i < portfolio.length; i++) {
                const portfolioStock = await Stock.findOne({ where: { id: portfolio[i].stockId } });
                portfolioArr.push(portfolioStock);
            }

            return res.json({ portfolioArr });
        } catch (e) {
            console.error(e);
        }
    }

    async sellStock(req, res) {
        try {
            const { id } = req.params;
            const user = req.user;

            Portfolio.findOne({ where: { userId: user.id } }).then(async userPortfolio => {
                if (userPortfolio === user.id) {
                    PortfolioStock.destroy({ where: { portfolioId: userPortfolio.id, stockId: id } }).then(() => {
                        return res.json({ message: "success" });
                    });
                } else {
                    return res.status(401).json({ message: "Unauthorized" });
                }
            });
        } catch (e) {
            console.error(e);
        }
    }
}

module.exports = new PortfolioController();
