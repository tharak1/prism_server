const express = require("express");
const validateToken = require("../middleware/tokenValidator");
const { createAttendance, getAttendance } = require("../controllers/attendanceController");

const router = express.Router();

router.route("/createatt").post(createAttendance);
router.route("/getatten").get(validateToken,getAttendance);

module.exports = router;