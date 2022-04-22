const { SerialPort } = require("../SerialPortController/SerialPortMiddleware");
const minute = 60000;
const second = 1000;

class Scheduler {
    constructor(endTime, command, onEnd, interval = minute) { //default check interval to minutes if none is provided
        this.endTime = endTime;
        this.command = command;
        this.onEnd = onEnd;
    }
    init() {
        const interval = setInterval(() => {
            const currentTime = new Date().getTime();
            if (currentTime >= this.endTime) {
                clearInterval(interval);
                this.executeCommand();
            }
        }, this.interval);
    }
    executeCommand() {
        SerialPort.executeCommand(this.command)
        this.exit();
    }
    exit() {
        console.log("End time", this.endTime, "reached", "\nexecuted", this.command);
        this.onEnd();
    }
}
module.exports = Scheduler;