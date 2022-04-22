const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
class SerialPortController {
    constructor(onExit) {
        this.onExit = onExit;
        //connect to serial port
        this.port = new SerialPort({ path: '/dev/ttyACM0', baudRate: 9600 });
        //initialize parser
        this.parser = new ReadlineParser();
        //set ready state for port
        this.ready = false;
    }
    init() {
        const self = this;
        this.port.pipe(this.parser);
        //wait for controller to ready
        this.parser.on('data', (txt) => {
            if (txt.indexOf("Ready to send IR signals at pin 3") !== -1) {
                this.ready = true;
            }
            console.log(txt); //read controller response
        })
        //loop wait till ready
        const readyWait = setInterval(function () {
            if (self.ready === false) {
                console.log("Waiting for controller");
                self.port.write("Waiting..\n");
            } else {
                clearInterval(readyWait); //end loop and execute command
                console.log("port is open");
            }
        }, 1000);
    }

    tempChangeByX(args, direction) {
        const self = this;
        let x = parseInt(args[1]);
        if (isNaN(x)) {
            console.log("Error getting temp value");
        } else {
            const tempLoop = setInterval(function () {
                if (x === 0) {
                    clearInterval(tempLoop);
                    console.log("Done updating temp");
                } else {
                    x--;
                    self.port.write(`Temp${direction}\n`);
                }
            }, 100);
        }
    }
    customTemp(args) {
        const self = this;
        let targetTemp = parseInt(args[1]);
        if (isNaN(targetTemp)) {
            console.log("Error getting temp value");
        } else {
            /*
                min temp = 60
                max temp = 86
                if temp <=73 start from 60
                else start from 86
                then go to target temp
            */
            const startTemp = targetTemp <= 73 ? { direction: "Down", target: 60 } : { direction: "Up", target: 86 };
            this.goToStartTemp(startTemp, function () {
                self.goToTargetTemp(startTemp, targetTemp)
            });
        }
    }
    goToStartTemp({ direction }, cb) {
        const self = this;
        let x = 26;
        const tempLoop = setInterval(function () {
            if (x === 0) {
                clearInterval(tempLoop);
                console.log("Hit Start Temp");
                cb();
            } else {
                x--;
                self.port.write(`Temp${direction}\n`);
            }
        }, 100);
    }
    goToTargetTemp(startTemp, target) {
        const self = this;
        const direction = startTemp.direction === "Up" ? "Down" : "Up"; //go opposite to start. ex) start 86 then go down from there to hit target
        let x = Math.abs(startTemp.target - target);
        const tempLoop = setInterval(function () {
            if (x === 0) {
                clearInterval(tempLoop);
                console.log("Hit Target Temp");
            } else {
                x--;
                self.port.write(`Temp${direction}\n`);
            }
        }, 100);
    }
    executeCommand(command) {
        const lower = command.toLowerCase();
        if (lower.indexOf("temp+") !== -1) this.tempChangeByX(command.split("+"), "Up");
        else if (lower.indexOf("temp-") !== -1) this.tempChangeByX(command.split("-"), "Down");
        else if (lower.indexOf("temp=") !== -1) this.customTemp(command.split("="));
        else {
            if (lower === "tempup") this.port.write("TempUp\n");
            else if (lower === "tempdown") this.port.write("TempDown\n");
            else { //if future commands are written, they wont be case checked but can still be executed
                console.log("writing");
                this.port.write(`${command}\n`);
            }
        }
    }
    exit() {
        console.log("Command exit");
        this.port.close((err) => {
            console.log("port closed");
        })
        this.onExit();
    }
}

module.exports = { SerialPortController: SerialPortController };