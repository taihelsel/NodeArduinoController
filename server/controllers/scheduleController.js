const Scheduler = require("../Scheduler/Scheduler");
const exampleSchedule = {
    "1298190": {
        exeTime: "1298190",
        command: "Power",
        reoccuring: true,
        interval: 60, //min to add each time new schedule is added
        desc: {
            every: ["day", "9:00am"],
            task: "toggle",
            command: "power",
        }
    }
}
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
