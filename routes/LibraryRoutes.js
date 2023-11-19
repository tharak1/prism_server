const express  = require("express");
const { createLibrary, booksget, getLib } = require("../controllers/libraryController");
const validateToken = require("../middleware/tokenValidator");
const router = express.Router();

router.route("/createlib").post(createLibrary);
router.route("/").get(validateToken,booksget);
router.route("/getlib").get(validateToken,getLib);
module.exports = router;