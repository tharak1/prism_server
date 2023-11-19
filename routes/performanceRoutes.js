const express = require("express");
const { createPerformance, getPerformance } = require("../controllers/performanceController");
const router = express.Router();
const validateToken = require("../middleware/tokenValidator");

router.route("/createper").post(createPerformance);
router.route("/getper").get(validateToken,getPerformance);

module.exports = router;
