<h1 align="center">
    Node Arduino Controller
</h1>

![demo](https://raw.githubusercontent.com/taihelsel/NodeArduinoController/main/previewImgs/ac-control-1.PNG)


#  Setup

###  Build and run client
 1. Go to project root directory.
 2. `cd client && npm install && npm run build && npm start`
 3. By default, the project will start on localhost:3000

### Running server

 1. Go to project root directory.
 2. Run `cd server && npm install && sudo node server.js`  

### Running server with client

 1. Go to project root directory.
 2. Run `cd server && npm install && cd ..` 
 3. Run `cd client && npm run build && cd ../server && sudo node server.js` 
 > builds client and starts server

### Running with pm2
 1. Go to project root directory.
 2. Run `cd server && sudo pm2 start nac-app-conf.json` 
 > pm2 must be run with sudo so node can read from serialport
 > can be accessed through pm2 using the name 'nac' 
 > ex) sudo pm2 monit nac

<details>
<summary> <h1>Project Screenshots</h1></summary>

### Set custom temps & Control unit power
![page1](https://raw.githubusercontent.com/taihelsel/NodeArduinoController/main/previewImgs/ac-control-4.PNG)
### Create custom schedules
![page2](https://raw.githubusercontent.com/taihelsel/NodeArduinoController/main/previewImgs/ac-control-2.PNG)
### Delete created schedules
![page3](https://raw.githubusercontent.com/taihelsel/NodeArduinoController/main/previewImgs/ac-control-3.PNG)
    
</details>