// POST
module.exports.power = (req, res) => {
    // @route  POST /power
    // @desc   Toggle Power
    // @access Public
    try {
        req.controller.executeCommand("Power");
        return res.status(201).json({ msg: "Power Toggled" });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ error: { msg: "Error updating power state" } });
    }
}
