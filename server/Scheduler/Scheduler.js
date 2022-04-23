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
                //execute and remove from scheduler
                this.executeCommand(this.currentSchedules[exeTime].command);
                delete this.currentSchedules[exeTime];
            }
        });
    }
    addSchedule(exeTime, command, details) {
        this.currentSchedules[exeTime] = { command, details };
    }
    executeCommand(command) {
        SerialPort.executeCommand(command)
    }
}
module.exports = Scheduler;