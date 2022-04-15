const express = require("express"), router = express.Router();
const { power } = require("../controllers/powerControllers.js");

// @route  POST /power
// @desc   Toggle Power
// @access Public
router.post("/", power);

module.exports = router;