const express = require("express");
const { createBus, getAllBuses } = require("../controllers/transportController");
const router = express.Router();

router.route("/createbus").post(createBus);
router.route("/getbuses").get(getAllBuses);

module.exports = router;