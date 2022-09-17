const express = require("express"), router = express.Router();
const { inc, dec, custom } = require("../controllers/tempControllers.js");

// @route  POST /temp/inc
// @desc   Increase temp by given amount
// @access Public
router.post("/inc", inc);

// @route  POST /temp/dec
// @desc   Decrease temp by given amount
// @access Public
router.post("/dec", dec);


// @route  POST /temp/custom
// @desc   Set custom temp
// @access Public
router.post("/custom", custom);
module.exports = router;