const Scheduler = require("../Scheduler/Scheduler");

module.exports.test = (req, res) => {
    // @route  POST /schedule/test
    // @desc   Testing scheduled times
    // @access Public
    try {
        const twoSecondsLater = new Date();
        twoSecondsLater.setSeconds(twoSecondsLater.getSeconds() + 3.5);
        let scheduledEvent = new Scheduler(twoSecondsLater.getTime(), "tempdown", function () {
            scheduledEvent = null;
        });
        scheduledEvent.init();
        return res.status(201).json({ msg: "Power Toggled" });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ error: { msg: "Error updating power state" } });
    }
}
