//imports
const express = require("express");
const path = require('path');
const session = require('express-session');
const app = express();
//config
const port = 80;
//middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(session({
    secret: "12345",
    resave: false,
    saveUninitialized: true
}));
app.use(express.static(path.resolve(__dirname, '..', 'client', 'build')));
//server logging
app.use(require("morgan")("dev"));
//routes
app.use("/temp", require("./routes/temp"));
app.use("/power", require("./routes/power"));

//sending build
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
});
//setting port & starting server
const server = app.listen(port, () => {
    console.log("Server started on port", port);
});
module.exports = server;