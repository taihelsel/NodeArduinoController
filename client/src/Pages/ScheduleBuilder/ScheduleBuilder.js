import React, { useState } from 'react';
import "./ScheduleBuilder.css";
import TODInput from './TODInput';
import IntervalInput from './IntervalInput';
import TempInput from './TempInput';
function ScheduleBuilder({ updatePage }) {
    const [currentStep, setCurrentStep] = useState("schedule");
    const [selectedStepOption, setSelectedStepOption] = useState(null);
    const [tempVal, setTempVal] = useState({
        temp: "",
        type: null,
        ready: false,
    })
    const [schedTime, setSchedTime] = useState({
        hour: "",
        minute: "",
        zone: null
    });
    const [intervalVal, setIntervalVal] = useState({
        value: "",
        type: "",
        ready: false,
    });
    const [nextAction, setNextAction] = useState({ showNext: false, nextStep: null });
    const [schedConfig, setSchedConfig] = useState({
        exeTime: null,
        command: null,
        reoccuring: null,
        interval: null, //min to add each time new schedule is added
        desc: {
            every: null,
            task: null,
            command: null,
        }
    });
    const handleIntervalUpdate = (newInterval) => {
        if (newInterval.ready) {
            const newSchedConfig = { ...schedConfig };
            newSchedConfig.desc.every[1] = newInterval.value;
            setSchedConfig(newSchedConfig);
            setNextAction({
                showNext: true,
                nextStep: "set-task",
            })
        } else {
            setNextAction({
                showNext: false,
                nextStep: null,
            })
        }
        setIntervalVal(newInterval);
    }
    const handleTempUpdate = (newTemp) => {
        if (newTemp.ready) {
            const { temp, type } = newTemp;
            let command = "";
            let descCommand = "";
            const task = "Set";
            if (type === "dec-temp-x") {
                command = "temp-";
                descCommand = "Temp - "
            }
            if (type === "inc-temp-x") {
                command = "temp+";
                descCommand = "Temp + "
            }
            if (type === "set-temp") {
                command = "temp=";
                descCommand = "Temp = "
            }
            command += temp;
            descCommand += temp;
            finalizeConfig(command, task, descCommand);
            setNextAction({
                showNext: true,
                nextStep: "save",
            })
        } else {
            setNextAction({
                showNext: false,
                nextStep: "save",
            })
        }
        setTempVal(newTemp);
    }
    const handleCancel = () => {
        updatePage("schedule")
    }
    const submitScheduledEvent = () => {
        const url = "/schedule/";
        const data = { "exeTime": schedConfig.exeTime, "scheduledEvent": schedConfig };
        fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(res => res.json())
            .then(data => {
                updatePage("schedule");
                // alert(data.msg);
            });
    }
    const handleNext = () => {
        if (nextAction.showNext === true) {
            if (nextAction.nextStep === "save") {
                //submit scheduled event and go back to schedule list
                submitScheduledEvent();
            } else {
                setCurrentStep(nextAction.nextStep);
                setNextAction({
                    showNext: false,
                    nextStep: null,
                });
                setSelectedStepOption("");
            }
        }
    }
    const handleOptionClick = (nextStep, option) => e => {
        console.log("option", option, "step", nextStep);
        setSelectedStepOption(option);
        if (nextStep === "tod-input") {
            const newSchedConfig = { ...schedConfig };
            newSchedConfig.desc.every = ["day"];
            setSchedConfig(newSchedConfig);
            setNextAction({
                showNext: true,
                nextStep,
            })
        }
        if (nextStep === "x-min-input" || nextStep === "x-hour-input") {
            const newSchedConfig = { ...schedConfig };
            newSchedConfig.desc.every = [option];
            setSchedConfig(newSchedConfig);
            setNextAction({
                showNext: true,
                nextStep,
            })
        }
        if (nextStep === "set-task") {
            if (option === "am" || option === "pm") {
                //update the event time
                const newSchedTime = { ...schedTime };
                newSchedTime.zone = option;
                setSchedTime(newSchedTime);
                //add new event time to config
                const newSchedConfig = { ...schedConfig };
                newSchedConfig.desc.every[1] = `${schedTime.hour}:${schedTime.minute}${option}`
                setSchedConfig(newSchedConfig);
                //show next button
                setNextAction({
                    showNext: true,
                    nextStep,
                });
            }
            if (option === "hour") {
                const newSchedConfig = { ...schedConfig };
                newSchedConfig.desc.every = [option];
                setSchedConfig(newSchedConfig);
                //show next button
                setNextAction({
                    showNext: true,
                    nextStep,
                });
            }
        }
        if (nextStep === "temp-input") {
            setNextAction({
                showNext: true,
                nextStep: option,
            });
        }
        if (nextStep === "save") {
            if (option === "power") {
                finalizeConfig("Power", "Toggle", "Power");
                setNextAction({
                    showNext: true,
                    nextStep,
                });
            }
        }
    }
    function configHours(d, target, minute, zone) {
        const dHr = d.getHours();
        const dMin = d.getMinutes();
        if (zone === "pm") target += 12;
        if (dHr === target && dMin < minute) {
            //can sched today
            d.setHours(target);
        }
        else {
            //sched tomorrorow
            d.setHours(dHr < target ? target : target + 24);
        }
    }
    const finalizeConfig = (command, task, descCommand) => {
        const newSchedConfig = { ...schedConfig };
        const every = schedConfig.desc.every[0].toLowerCase();
        const interval = parseInt(intervalVal.value);
        const d = new Date();
        if (every === "day") {
            //setting exe time
            const schedMin = parseInt(schedTime.minute);
            const schedHour = parseInt(schedTime.hour);
            configHours(d, schedHour, schedMin, schedTime.zone)
            d.setMinutes(schedMin)
            //setting interval
            newSchedConfig.reoccuring = true;
            newSchedConfig.interval = 60 * 24;//60min*24hr
        }
        else if (every === "hours") {
            //setting exe time
            d.setHours(d.getHours() + parseInt(intervalVal.value));
            //setting interval
            newSchedConfig.reoccuring = true;
            newSchedConfig.interval = 60 * interval;//60min * every x hours
        }
        else if (every === "minutes") {
            //setting exe time
            d.setMinutes(d.getMinutes() + parseInt(intervalVal.value));
            //setting interval
            newSchedConfig.reoccuring = true;
            newSchedConfig.interval = interval;//every x minutes
        } else if (every === "hour") {
            //setting exe time
            d.setHours(d.getHours() + 1);
            //setting interval
            newSchedConfig.reoccuring = true;
            newSchedConfig.interval = 60;//every hour
        } else {
            console.error("something weird happened getting 'every' value");
        }
        newSchedConfig.desc.task = task;
        newSchedConfig.desc.command = descCommand;
        newSchedConfig.command = command;
        newSchedConfig.exeTime = d.getTime();
        setSchedConfig(newSchedConfig);
        console.log("sched", newSchedConfig);
    }
    const renderCurrentStep = (step) => {
        if (step === "schedule") {
            return (
                <div className="sched-step-container">
                    <h1 className="sched-step-title">Set Schedule</h1>
                    <div className="sched-step-body-row">
                        <div onClick={handleOptionClick("tod-input", "day")} id={selectedStepOption === "day" ? "sched-step-option-selected" : null} className="sched-step-option">Every Day</div>
                        <div onClick={handleOptionClick("x-min-input", "minutes")} id={selectedStepOption === "minutes" ? "sched-step-option-selected" : null} className="sched-step-option">Every X Minutes</div>
                        <div onClick={handleOptionClick("set-task", "hour")} id={selectedStepOption === "hour" ? "sched-step-option-selected" : null} className="sched-step-option">Every Hour</div>
                        <div onClick={handleOptionClick("x-hour-input", "hours")} id={selectedStepOption === "hours" ? "sched-step-option-selected" : null} className="sched-step-option">Every X Hours</div>
                    </div>
                </div>
            )
        }
        if (step === "tod-input") {
            return <TODInput optionClick={handleOptionClick} selectedOption={selectedStepOption} setSchedTime={setSchedTime} schedTime={schedTime} />
        }
        if (step === "x-min-input" || step === "x-hour-input") {
            return <IntervalInput intervalType={step} intervalVal={intervalVal} handleIntervalUpdate={handleIntervalUpdate} />
        }
        if (step === "set-task") {
            return (
                <div className="sched-step-container">
                    <h1 className="sched-step-title">Set Task</h1>
                    <div className="sched-step-body-row">
                        <div onClick={handleOptionClick("temp-input", "inc-temp-x")} id={selectedStepOption === "inc-temp-x" ? "sched-step-option-selected" : null} className="sched-step-option">Increase Temp By X</div>
                        <div onClick={handleOptionClick("temp-input", "set-temp")} id={selectedStepOption === "set-temp" ? "sched-step-option-selected" : null} className="sched-step-option">Set Temp To X</div>
                        <div onClick={handleOptionClick("save", "power")} id={selectedStepOption === "power" ? "sched-step-option-selected" : null} className="sched-step-option">Toggle Power</div>
                        <div onClick={handleOptionClick("temp-input", "dec-temp-x")} id={selectedStepOption === "dec-temp-x" ? "sched-step-option-selected" : null} className="sched-step-option">Decrease Temp By X</div>
                    </div>
                </div>
            )
        }
        if (step === "inc-temp-x" || step === "set-temp" || step === "dec-temp-x") {
            if (nextAction.nextStep !== "save") {
                //workaround to show save btn instead of 'next' on these pages
                setNextAction({
                    showNext: false,
                    nextStep: "save",
                });
            }
            return <TempInput tempType={step} tempVal={tempVal} handleTempUpdate={handleTempUpdate} />
        }
    }
    return (
        <section id="ScheduleBuilder">
            <div id="sched-builder-content">
                {renderCurrentStep(currentStep)}
            </div>
            <div className="sched-builder-controls-container">
                <div className="sched-builder-controls sched-builder-cancel" onClick={handleCancel}><h3>Cancel</h3></div>
                <div className={`sched-builder-controls sched-builder-confirm ${nextAction.showNext === false ? "sched-builder-confirm-disabled" : null}`} onClick={handleNext}><h3>{nextAction.nextStep === "save" ? "Save" : "Next"}</h3></div>
            </div>
        </section>
    );
}
export default ScheduleBuilder;