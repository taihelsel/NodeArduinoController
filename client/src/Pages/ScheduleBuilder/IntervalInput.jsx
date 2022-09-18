import React from "react";
import PropTypes from "prop-types";

export default function IntervalInput({
  intervalType,
  intervalVal,
  handleIntervalUpdate,
}) {
  // every hr, every x hr, every x min
  const label = intervalType === "x-min-input" ? "Minutes" : "Hours";
  const updateInterval = (value) => {
    const newInterval = { ...intervalVal };
    if (value.length === 0) {
      newInterval.value = "";
      newInterval.ready = false;
    } else {
      newInterval.value = value;
      newInterval.ready = true;
    }
    newInterval.type = intervalType;
    handleIntervalUpdate(newInterval);
  };
  const validTime = (time) => {
    const timeInt = parseInt(time);
    if (Number.isNaN(timeInt) === false && time.length > 0) {
      if (intervalType === "x-hour-input" && timeInt > 0 && timeInt <= 24) return true;
      if (intervalType === "x-min-input" && timeInt >= 0 && timeInt <= 59) return true;
    }
    return false;
  };
  const formatMin = (time) => {
    // formatting then update state
    const timeInt = parseInt(time);
    if (timeInt > 10) {
      return timeInt.toString();
    } if (timeInt === 0 && time.length > 1) {
      return ("00");
    }
    return time;
  };
  const handleInput = (e) => {
    const time = e.target.value;
    if (time.length === 0) updateInterval("");
    else if (validTime(time)) {
      if (intervalType === "minutes") updateInterval(formatMin(time));
      else updateInterval(time);
    }
  };
  return (
    <div className="sched-step-container">
      <h1 className="sched-step-title">Set Interval</h1>
      <div className="sched-step-body-row">
        <strong className="interval-input-labels">Every</strong>
        <input pattern="[0-9]*" type="number" placeholder={label} className="interval-input" onChange={handleInput} value={intervalVal.value} />
        <strong className="interval-input-labels">{label}</strong>
      </div>
    </div>
  );
}
IntervalInput.propTypes = {
  intervalType: PropTypes.string.isRequired,
  intervalVal: PropTypes.shape({
    value: PropTypes.number.isRequired,
    ready: PropTypes.bool.isRequired,
  }).isRequired,
  handleIntervalUpdate: PropTypes.func.isRequired,
};
