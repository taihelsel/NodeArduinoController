const express = require("express"), router = express.Router();
const { inc, dec5, custom } = require("../controllers/tempControllers.js");

// @route  POST /temp/inc
// @desc   Increase temp by given amount
// @access Public
router.post("/inc", inc);

// @route  POST /temp/dec5
// @desc   Decrease temp by 5
// @access Public
router.post("/dec5", dec5);

// @route  POST /temp/custom
// @desc   Set custom temp
// @access Public
router.post("/custom", custom);
module.exports = router;