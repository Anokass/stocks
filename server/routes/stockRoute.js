const Router = require("express");
const stockController = require("../controllers/stockController");
const checkRole = require("../middleware/checkRoleMiddleware");

const router = new Router();

router.post("/", checkRole("ADMIN"), stockController.create);
router.get("/", stockController.getAll);
router.get("/:id", stockController.getOne);

module.exports = router;
