const express = require("express"), router = express.Router();
const { inc5 } = require("../controllers/tempControllers.js");

// @route  POST /temp/inc5
// @desc   Increase temp by 5
// @access Public
router.post("/inc5", inc5);

module.exports = router;