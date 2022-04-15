const express = require("express"), router = express.Router();
const { inc5, dec5 } = require("../controllers/tempControllers.js");

// @route  POST /temp/inc5
// @desc   Increase temp by 5
// @access Public
router.post("/inc5", inc5);

// @route  POST /temp/dec5
// @desc   Decrease temp by 5
// @access Public
router.post("/dec5", dec5);

module.exports = router;