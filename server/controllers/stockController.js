const uuid = require("uuid");
const path = require("path");
const { Stock } = require("../models/models");
const ApiError = require("../error/ApiError");

class StockController {
    async create(req, res, next) {
        try {
            const {
                fullName,
                shortName,
                price,
                priceChangeForDay,
                priceChangeForYear,
                yieldOverSixMonth,
                sector,
                description,
            } = req.body;
            const { icon } = req.files;
            let fileName = uuid.v4() + ".png";
            await icon.mv(path.resolve(__dirname, "..", "static", fileName));

            const stock = await Stock.create({
                icon: fileName,
                fullName,
                shortName,
                price,
                priceChangeForDay,
                priceChangeForYear,
                yieldOverSixMonth,
                sector,
                description,
            })

            return res.json(stock);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        const stocks = await Stock.findAll();
        return res.json(stocks);
    }

    async getOne(req, res) {
        const { id } = req.params;
        const stock = await Stock.findOne({
            where: { id }
        });
        return res.json(stock);
    }
}

module.exports = new StockController();
