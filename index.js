const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')
//command to send to controller
const command = process.argv[2];
//connect to serial port
const port = new SerialPort({ path: '/dev/ttyACM0', baudRate: 9600 })
//initialize parser
const parser = new ReadlineParser()
port.pipe(parser)
//wait for controller to ready
let ready = false;
parser.on('data', (txt) => {
	if (txt.indexOf("Ready to send IR signals at pin 3") !== -1) {
		ready = true;
	}
	console.log(txt); //read controller response
})
const readyWait = setInterval(function () {
	if (ready === false) {
		console.log("Waiting for controller");
		port.write("Waiting..\n");
	} else {
		clearInterval(readyWait);
		executeCommand();
	}
}, 1000);

const executeCommand = function () {
	port.write(`${command}\n`);
	console.log(`Sent ${command} command\r\nExiting Node`);
	process.exit(1);
}
