const Scheduler = require("../Scheduler/Scheduler");
let ScheduledCommands = new Scheduler();
function addToSchedule(command, time) {
    //verify it exists
    if (ScheduledCommands === null) {
        ScheduledCommands = new Scheduler();
    }
    //add to schedule
    const details = "testing123";
    ScheduledCommands.addSchedule(time, command, details);
    //start it
    if (ScheduledCommands.isRunning === false) {
        ScheduledCommands.init();
    }
}
module.exports.schedule = (req, res) => {
    // @route  POST /schedule/
    // @desc   Schedule a command
    // @access Public
    try {
        const { command, time } = req.body;
        addToSchedule(command, time);
        return res.status(201).json({ msg: "Scheduler set" });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ error: { msg: "Error updating power state" } });
    }
}
