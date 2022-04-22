const express = require("express"), router = express.Router();
const { schedule } = require("../controllers/scheduleController.js");

// @route  POST /schedule/
// @desc   Schedule a command
// @access Public
router.post("/", schedule);

module.exports = router;