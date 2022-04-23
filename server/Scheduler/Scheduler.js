const { SerialPort } = require("../SerialPortController/SerialPortMiddleware");
const minute = 60000;
const second = 1000;

class Scheduler {
    constructor(currentSchedules = {}, interval = minute) {
        this.currentSchedules = currentSchedules;
        this.isRunning = false;
        this.interval = interval; //default check interval to minutes if none is provided
    }
    init() {
        if (this.isRunning === false) {
            const interval = setInterval(() => {
                const scheduleTimes = Object.keys(this.currentSchedules);
                if (scheduleTimes.length === 0) {
                    clearInterval(interval);
                    this.isRunning = false;
                    console.log("Scheduler stopped");
                }
                else this.executeSchedules(scheduleTimes);
                console.log(JSON.stringify(this.currentSchedules))
            }, this.interval);
            this.isRunning = true;
            console.log("Scheduler started");
        } else {
            console.log("Scheduler already running");
        }
    }
    executeSchedules(scheduleTimes) {
        const currentTime = new Date().getTime();
        scheduleTimes.forEach(exeTime => {
            if (currentTime >= exeTime) {
                //ready to execute scheduled event
                this.executeCommand(this.currentSchedules[exeTime].command);
                this.handleScheduleCleanup(exeTime, this.currentSchedules[exeTime]);
            }
        });
    }
    handleScheduleCleanup(exeTime, scheduledEvent) {
        if (scheduledEvent.reoccuring === true) {
            //create new sched event if it's set to repeat, then delete the old sched event
            const d = new Date();
            d.setMinutes(d.getMinutes() + scheduledEvent.interval);
            const time = d.getTime();
            const newSchedEvent = { ...scheduledEvent };
            newSchedEvent.exeTime = time;
            this.currentSchedules[time] = newSchedEvent;
        }
        delete this.currentSchedules[exeTime];
    }
    addSchedule(exeTime, scheduledEvent) {
        /*example schedule
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
        }*/
        this.currentSchedules[exeTime] = { ...scheduledEvent };
    }
    executeCommand(command) {
        SerialPort.executeCommand(command)
    }
}
module.exports = Scheduler;