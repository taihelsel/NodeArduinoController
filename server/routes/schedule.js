const express = require("express"), router = express.Router();
const { test } = require("../controllers/scheduleController.js");

// @route  POST /schedule/test
// @desc   Testing scheduled times
// @access Public
router.post("/test", test);

module.exports = router;