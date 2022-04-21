const { SerialPortController } = require("./SerialPortController");

let SerialPort = new SerialPortController(function () {
    controller = null;
    console.log("controller exit");
}, false)
SerialPort.init();
function serialPortMiddleware(req, res, next) {
    if (SerialPort === null) {
        SerialPort = new SerialPortController(function () {
            SerialPort = null;
            console.log("controller exit");
        }, false)
        SerialPort.init();
    }
    if (typeof req.controller === "undefined" || req.controller === null) {
        req.controller = SerialPort;
    }
    next();
}

module.exports = { serialPortMiddleware, SerialPort };