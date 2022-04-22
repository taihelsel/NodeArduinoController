const Scheduler = require("../Scheduler/Scheduler");

const currentSchedules = {}; //time:schedule
module.exports.schedule = (req, res) => {
    // @route  POST /schedule/
    // @desc   Schedule a command
    // @access Public
    try {
        const { command, time } = req.body;
        let scheduledEvent = new Scheduler(time, command, function () {
            scheduledEvent = null;
        });
        scheduledEvent.init();
        currentSchedules[time] = scheduledEvent;
        return res.status(201).json({ msg: "Scheduler set" });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ error: { msg: "Error updating power state" } });
    }
}
