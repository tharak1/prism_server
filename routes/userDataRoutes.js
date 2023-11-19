const express = require("express");
const { createUserData, getUserData, deleteUserData, deleteAllUsersData, getallUserData, validateUser, getAllUsersDataAsSection } = require("../controllers/userDataController");
const validateToken = require("../middleware/tokenValidator");

const router = express.Router();

router.route('/createuserdata').post(createUserData);
router.route('/getalluserdata').get(getallUserData);
router.route('/getuserdata').get( validateToken,getUserData);
router.route('/validateuser').get( validateToken,validateUser);
router.route('/deleteuserdata/:id').delete(deleteUserData);
router.route('/deletealluserdata').delete(deleteAllUsersData);
router.route('/filter').get(getAllUsersDataAsSection);

module.exports = router;

