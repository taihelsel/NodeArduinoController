<h1 align="center">
    Node Arduino Controller
</h1>
<div align="center">
    <img src="https://raw.githubusercontent.com/taihelsel/NodeArduinoController/main/previewImgs/ac-control-1.PNG"/>
</div>

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
   can be accessed through pm2 using the name 'nac'   
   ex) sudo pm2 monit nac  


# Routes
| Path|Method|Expects | Response| Result
| --- | --- | --- |---|---|
| /power/| POST | N/A |`{ msg:  "Power Toggled" }`| Toggles AC Power
| /schedule/| POST | `{ exeTime: epoch time as int,  scheduledEvent: command to execute as string}`| `{ msg:  "Scheduler set" }`| Adds command to scheduler
| /schedule/list/| GET| N/A | **see below** | Fetches current schedules
| /schedule/list/| DELETE | `{list: [array of epoch exe times as ints]` | `{"msg":"Deleted item"}`| Deletes one or more scheduled events
| /temp/inc5/| POST | N/A | `{ msg:  "Temp changed successfully"}`|  Increases AC temp by 5
| /temp/dec5/| POST | N/A | `{ msg:  "Temp changed successfully"}`|  Decreases AC temp by 5
| /temp/custom/| POST | `{temp: temp value as string} `| `{ msg:  "Temp changed successfully" }`|  Sets AC temp to custom value

> Example */schedule/list/* response
```
 '1657129487911': {                                                                      
	exeTime: 1657129487911,  //epoch time to execute event ( also used as key in scheduler )        
	command: 'Power', // command to execute
    reoccuring: true, // true=keep command for next interval. false=delete event after              execution                                               
    interval: 60, //event interval in minutes                                                                             
    desc: { every: [Array], task: 'Toggle', command: 'Power' } //information to be displayed on schedule page                          
} 
```

<details>
<summary> <h1>Project Screenshots</h1></summary>

### Set custom temps & Control unit power
![page1](https://raw.githubusercontent.com/taihelsel/NodeArduinoController/main/previewImgs/ac-control-4.PNG)
### Create custom schedules
![page2](https://raw.githubusercontent.com/taihelsel/NodeArduinoController/main/previewImgs/ac-control-2.PNG)
### Delete created schedules
![page3](https://raw.githubusercontent.com/taihelsel/NodeArduinoController/main/previewImgs/ac-control-3.PNG)
    
</details>