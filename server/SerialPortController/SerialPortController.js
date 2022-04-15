const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
class SerialPortController {
    constructor(command, onExit) {
        this.command = command;
        this.onExit = onExit;
        //connect to serial port
        this.port = new SerialPort({ path: '/dev/ttyACM0', baudRate: 9600 });
        //initialize parser
        this.parser = new ReadlineParser();
        port.pipe(parser);
        //set ready state for port
        this.ready = false;
    }
    init() {
        //wait for controller to ready
        this.parser.on('data', (txt) => {
            if (txt.indexOf("Ready to send IR signals at pin 3") !== -1) {
                this.ready = true;
            }
            console.log(txt); //read controller response
        })
        //loop wait till ready
        const readyWait = setInterval(function () {
            if (ready === false) {
                console.log("Waiting for controller");
                port.write("Waiting..\n");
            } else {
                clearInterval(readyWait); //end loop and execute command
                this.executeCommand();
            }
        }, 1000);
    }

    tempChangeByX(args, direction) {
        let x = parseInt(args[1]);
        if (isNaN(x)) {
            console.log("Error getting temp value");
            exit();
        } else {
            const tempLoop = setInterval(function () {
                if (x === 0) {
                    clearInterval(tempLoop);
                    console.log("Done updating temp");
                    exit();
                } else {
                    x--;
                    port.write(`Temp${direction}\n`);
                }
            }, 500);
        }
    }
    executeCommand() {
        const lower = this.command.toLowerCase();
        if (lower.indexOf("temp+") !== -1) tempChangeByX(this.command.split("+"), "Up");
        else if (lower.indexOf("temp-") !== -1) tempChangeByX(this.command.split("-"), "Down");
        else {
            if (lower === "tempup") port.write("TempUp\n");
            else if (lower === "tempdown") port.write("TempDown\n");
            else { //if future commands are written, they wont be case checked but can still be executed
                port.write(`${this.command}\n`);
            }
            exit();
        }
    }
    exit() {
        console.log("Command exit");
        this.onExit();
    }
}
export default SerialPortController;