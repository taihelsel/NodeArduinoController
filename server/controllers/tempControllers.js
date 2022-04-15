const SerialPortController = require("../controllers/tempControllers.js");
// POST
module.exports.inc5 = async (req, res) => {
    // @route  POST /temp/inc5
    // @desc   Increase temp by 5
    // @access Public
    try {
        let controller = new SerialPortController("temp+5", function () {
            controller = null;
            return res.status(201).json({ msg: "temp changed" });
        });
        controller.init();
    } catch (err) {
        console.log("error inc temp by 5");
        console.log(err);
        return res.status(400).json({ error: { msg: "unable to add server" } });
    }
}