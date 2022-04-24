const express = require("express"), router = express.Router();
const { schedule, list } = require("../controllers/scheduleController.js");

// @route  POST /schedule/
// @desc   Schedule a command
// @access Public
router.post("/", schedule);

// @route  GET /schedule/list
// @desc   Fetch current schedules
// @access Public
router.get("/list", list);

module.exports = router;