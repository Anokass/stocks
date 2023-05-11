const Router = require("express");
const userRoute = require("./userRoute");
const stockRoute = require("./stockRoute");
const portfolioRoute = require("./portfolioRoute");

const router = new Router();

router.use("/user", userRoute);
router.use("/stock", stockRoute);
router.use("/portfolio", portfolioRoute);

module.exports = router;
