const { SerialPort } = require("../SerialPortController/SerialPortMiddleware");

class Scheduler {
    constructor(endTime, command, onEnd) {
        this.endTime = endTime;
        this.command = command;
        this.onEnd = onEnd;
    }
    init() {
        const minute = 60000;
        const second = 1000;
        const interval = setInterval(() => {
            const currentTime = new Date().getTime();
            if (currentTime >= this.endTime) {
                clearInterval(interval);
                this.executeCommand();
            }
        }, second);
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