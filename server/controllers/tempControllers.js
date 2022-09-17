// POST
module.exports.inc = (req, res) => {
    // @route  POST /temp/inc
    // @desc   Increase temp by given amount
    // @access Public
    try {
        const { amount } = req.body;
        req.controller.executeCommand(`temp+${amount}`);
        return res.status(201).json({ msg: "Temp changed successfully" });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ error: { msg: "Error updating temp" } });
    }
}

module.exports.dec5 = (req, res) => {
    // @route  POST /temp/dec5
    // @desc   Decrease temp by 5
    // @access Public
    try {
        req.controller.executeCommand("temp-5");
        return res.status(201).json({ msg: "Temp changed successfully" });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ error: { msg: "Error updating temp" } });
    }
}

module.exports.custom = (req, res) => {
    // @route  POST /temp/custom
    // @desc   Set custom temp
    // @access Public
    try {
        const { temp } = req.body;
        req.controller.executeCommand(`temp=${temp}`);
        return res.status(201).json({ msg: "Temp changed successfully" });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ error: { msg: "Error updating temp" } });
    }
}