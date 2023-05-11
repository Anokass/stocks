const sequelize = require("../database");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    login: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "USER" },
});

const Portfolio = sequelize.define("portfolio", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const PortfolioStock = sequelize.define("portfolio-stock", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    portfolioId: { type: DataTypes.INTEGER },
    stockId: { type: DataTypes.INTEGER },
});

const Stock = sequelize.define("stock", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    icon: { type: DataTypes.STRING, allowNull: false },
    fullName: { type: DataTypes.STRING, unique: true, allowNull: false },
    shortName: { type: DataTypes.STRING, unique: true, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    priceChangeForDay: { type: DataTypes.FLOAT, allowNull: false },
    priceChangeForYear: { type: DataTypes.FLOAT, allowNull: false },
    yieldOverSixMonth: { type: DataTypes.FLOAT, allowNull: false },
    sector: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
});

User.hasOne(Portfolio);
Portfolio.belongsTo(User);

Portfolio.hasMany(PortfolioStock);
PortfolioStock.belongsTo(Portfolio);

Stock.hasMany(PortfolioStock);
PortfolioStock.belongsTo(Stock);

module.exports = { User, Portfolio, PortfolioStock, Stock };
