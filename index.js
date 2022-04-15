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

function tempChangeByX(args, direction) {
	console.log(args);
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
function executeCommand() {
	const lower = command.toLowerCase();
	if (lower.indexOf("temp+") !== -1) tempChangeByX(command.split("+"), "Up");
	else if (lower.indexOf("temp-") !== -1) tempChangeByX(command.split("-"), "Down");
	else {
		if (lower === "tempup") port.write("TempUp\n");
		else if (lower === "tempdown") port.write("TempDown\n");
		else { //if future commands are written, they wont be case checked but can still be executed
			port.write(`${command}\n`);
		}
		exit();
	}
}
function exit() {
	console.log("Exiting Node");
	process.exit(1);
}