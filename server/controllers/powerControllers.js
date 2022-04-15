const { SerialPortController } = require("../SerialPortController/SerialPortController")
// POST
module.exports.power = (req, res) => {
    // @route  POST /power
    // @desc   Toggle Power
    // @access Public
    try {
        let controller = new SerialPortController("Power", function () {
            controller = null;
            return res.status(201).json({ msg: "Power Toggled" });
        });
        controller.init();
    } catch (err) {
        console.log(err);
        return res.status(400).json({ error: { msg: "Error updating power state" } });
    }
}

