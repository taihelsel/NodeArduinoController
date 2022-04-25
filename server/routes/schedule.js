const express = require("express"), router = express.Router();
const { schedule, list, del } = require("../controllers/scheduleController.js");

// @route  POST /schedule/
// @desc   Schedule a command
// @access Public
router.post("/", schedule);

// @route  GET /schedule/list
// @desc   Fetch current schedules
// @access Public
router.get("/list", list);


// @route  DELETE /schedule/delete
// @desc   Delete scheduled event from scheduler
// @access Public
router.delete("/delete", del);

module.exports = router;