import React from "react";
import PropTypes from "prop-types";

export default function TODInput({
  optionClick,
  selectedOption,
  setSchedTime,
  schedTime,
}) {
  const validTime = (time, n) => {
    const timeInt = parseInt(time);
    if (Number.isNaN(timeInt) === false && time.length > 0) {
      if (n === "hour" && timeInt > 0 && timeInt <= 12) return true;
      if (n === "min" && timeInt >= 0 && timeInt <= 59) return true;
    }
    return false;
  };
  const updateSched = (minute = false, hour = false) => {
    const newSched = { ...schedTime };
    if (hour) {
      if (hour.length === 0) newSched.hour = "";
      else newSched.hour = hour;
    }
    if (minute) {
      if (minute.length === 0) newSched.minute = "";
      else newSched.minute = minute;
    }
    setSchedTime(newSched);
  };
  const updateMin = (e) => {
    const time = e.target.value;
    if (time.length === 0) updateSched("", false);
    else if (validTime(time, "min")) {
      // formatting then update state
      const timeInt = parseInt(time);
      if (timeInt > 10) {
        updateSched(timeInt.toString(), false);
      } else if (timeInt === 0 && time.length > 1) {
        updateSched("00", false);
      } else {
        updateSched(time, false);
      }
    }
  };
  const updateHour = (e) => {
    const time = e.target.value;
    if (time.length === 0) updateSched(false, "");
    else if (validTime(time, "hour")) {
      updateSched(false, time);
    }
  };
  return (
    <div className="sched-step-container">
      <h1 className="sched-step-title">Set Time</h1>
      <div className="sched-step-body-column">
        <div className="tod-input-container">
          <input pattern="[0-9]*" placeholder="Hour" className="tod-input" onChange={updateHour} value={schedTime.hour} type="number" />
          <strong>:</strong>
          <input pattern="[0-9]*" placeholder="Minute" className="tod-input" onChange={updateMin} value={schedTime.minute} type="number" />
        </div>
        <div className="sched-step-option-container">
          <button type="button" onClick={optionClick("set-task", "am")} id={selectedOption === "am" ? "sched-step-option-selected" : null} className="sched-step-option">AM</button>
          <button type="button" onClick={optionClick("set-task", "pm")} id={selectedOption === "pm" ? "sched-step-option-selected" : null} className="sched-step-option">PM</button>
        </div>
      </div>
    </div>
  );
}
TODInput.propTypes = {
  optionClick: PropTypes.func.isRequired,
  selectedOption: PropTypes.string.isRequired,
  setSchedTime: PropTypes.func.isRequired,
  schedTime: PropTypes.string.isRequired,
};
