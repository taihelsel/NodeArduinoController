const Scheduler = require("../Scheduler/Scheduler");
let ScheduledCommands = new Scheduler();
function addToSchedule(exeTime, scheduledEvent) {
    //verify it exists
    if (ScheduledCommands === null) {
        ScheduledCommands = new Scheduler();
    }
    //add to schedule
    ScheduledCommands.addSchedule(exeTime, scheduledEvent);
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
        const { exeTime, scheduledEvent } = req.body;
        addToSchedule(exeTime, scheduledEvent);
        return res.status(201).json({ msg: "Scheduler set" });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ error: { msg: "Error updating power state" } });
    }
}


module.exports.list = (req, res) => {
    // @route  GET /schedule/list
    // @desc   Fetch current schedules
    // @access Public
    try {
        const data = ScheduledCommands.currentSchedules;
        return res.status(201).json({ ok: true, data: data });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ ok: false, error: { msg: "Error updating power state" } });
    }
}

module.exports.del = (req, res) => {
    // @route  DELETE /schedule/delete
    // @desc   Delete scheduled event from scheduler
    // @access Public
    try {
        const { exeTime } = req.body;
        ScheduledCommands.deleteSchedule(exeTime);
        return res.status(201).json({ ok: true, msg: "Deleted item" });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ ok: false, error: { msg: "Error updating power state" } });
    }
}
