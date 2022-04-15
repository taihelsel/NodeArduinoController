const { SerialPortController } = require("../SerialPortController/SerialPortController")
// POST
module.exports.inc5 = async (req, res) => {
    // @route  POST /temp/inc5
    // @desc   Increase temp by 5
    // @access Public
    try {
        let controller = new SerialPortController("temp+5", function () {
            controller = null;
            return res.status(201).json({ msg: "Temp changed successfully" });
        });
        controller.init();
    } catch (err) {
        console.log(err);
        return res.status(400).json({ error: { msg: "Error updating temp" } });
    }
}

module.exports.dec5 = async (req, res) => {
    // @route  POST /temp/dec5
    // @desc   Decrease temp by 5
    // @access Public
    try {
        let controller = new SerialPortController("temp-5", function () {
            controller = null;
            return res.status(201).json({ msg: "Temp changed successfully" });
        });
        controller.init();
    } catch (err) {
        console.log(err);
        return res.status(400).json({ error: { msg: "Error updating temp" } });
    }
}