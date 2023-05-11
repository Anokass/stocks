const Router = require("express");
const portfolioController = require("../controllers/portfolioController");
const authMiddleware = require("../middleware/authMiddleware");
const checkSoldStockMiddleware = require("../middleware/checkSoldStockMiddleware")

const router = new Router();

router.post("/", authMiddleware, portfolioController.addStock);
router.get("/", authMiddleware, portfolioController.getStocks);
router.delete("/:id", authMiddleware, checkSoldStockMiddleware, portfolioController.sellStock);

module.exports = router;
