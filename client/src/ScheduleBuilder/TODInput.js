import React, { useState } from 'react';

function TODInput({ optionClick, selectedOption, setSchedTime, schedTime }) {
    const [hour, setHour] = useState("");
    const [minute, setMinute] = useState("");

    const validTime = (time, n) => {
        if (parseInt(time) !== NaN && time.length > 0) {
            const timeInt = parseInt(time);
            if (n === "hour" && timeInt > 0 && timeInt <= 12) return true;
            if (n === "min" && timeInt >= 0 && timeInt <= 59) return true;
        }
        return false;
    }
    const updateSched = () => {
        const newSched = { ...schedTime }
        if (hour.length === 0) newSched.hour = null;
        else newSched.hour = hour;
        if (minute.length === 0) newSched.minute = null;
        else newSched.minute = minute;
        setSchedTime(newSched);
    }
    const updateMin = (e) => {
        const time = e.target.value;
        if (time.length === 0) setMinute("");
        else if (validTime(time, "min")) {
            //formatting then update state
            const timeInt = parseInt(time);
            if (timeInt > 10) {
                setMinute(timeInt.toString());
            } else if (timeInt === 0 && time.length > 1) {
                setMinute("00");
            } else {
                setMinute(time);
            }
        }
        updateSched();
    }
    const updateHour = (e) => {
        const time = e.target.value;
        if (time.length === 0) setHour("");
        else if (validTime(time, "hour")) {
            setHour(time);
        }
        updateSched();
    }
    return (
        <div className="sched-step-container">
            <h1 className="sched-step-title">Set Time</h1>
            <div className="sched-step-body-column">
                <div className="tod-input-container">
                    <input placeholder="Hour" className="tod-input" onChange={updateHour} value={hour} type="text" />
                    <strong>:</strong>
                    <input placeholder="Minute" className="tod-input" onChange={updateMin} value={minute} type="text" />
                </div>
                <div className="sched-step-option-container">
                    <div onClick={optionClick("set-task", "am")} id={selectedOption === "am" ? "sched-step-option-selected" : null} className="sched-step-option">AM</div>
                    <div onClick={optionClick("set-task", "pm")} id={selectedOption === "pm" ? "sched-step-option-selected" : null} className="sched-step-option">PM</div>
                </div>
            </div>
        </div>
    )
}
export default TODInput;