const Router = require("express");
const userRoute = require("./userRoute");
const stockRoute = require("./stockRoute");
const portfolioRoute = require("./portfolioRoute");
const accessMiddleware = require("../middleware/accessControlAllowMiddleware");

const router = new Router();

router.use("/user", accessMiddleware, userRoute);
router.use("/stock", accessMiddleware, stockRoute);
router.use("/portfolio", accessMiddleware, portfolioRoute);

module.exports = router;
