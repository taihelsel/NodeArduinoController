const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')

const port = new SerialPort({ path: '/dev/ttyACM0', baudRate: 9600 })
const parser = new ReadlineParser()
port.pipe(parser)
let ready = false;
parser.on('data', (txt)=>{
	if(txt.indexOf("Ready to send IR signals at pin 3")!==-1){
		ready=true;
	}
	console.log(txt);
})
const readyWait = setInterval(function(){
	if(ready===false){
		console.log("Waiting for controller");
		port.write("Waiting..\n");
	}else{
		clearInterval(readyWait);
		port.write("Power\n");
	}
},1000);
