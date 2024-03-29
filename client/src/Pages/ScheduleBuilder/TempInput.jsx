import React from "react";
import PropTypes from "prop-types";

export default function TempInput({ tempType, tempVal, handleTempUpdate }) {
  const getTempLabel = () => {
    if (tempType === "set-temp") return ["", "Temp"];
    if (tempType === "inc-temp-x") return ["+", "1-26"];
    if (tempType === "dec-temp-x") return ["-", "1-26"];
    return null;
  };
  const updateTemp = (temp) => {
    const newTemp = { ...tempVal };
    if (temp.length === 0) {
      newTemp.temp = "";
      newTemp.ready = false;
    } else if (tempType === "set-temp") {
      // make sure temp is in valid range before allowing schedule to save.
      const tempInt = parseInt(temp);
      if (tempInt >= 60 && tempInt <= 86) {
        // valid temp, allow save
        newTemp.ready = true;
      } else {
        newTemp.ready = false;
      }
      newTemp.temp = temp;
    } else {
      newTemp.temp = temp;
      newTemp.ready = true;
    }
    newTemp.type = tempType;
    handleTempUpdate(newTemp);
  };
  const validTemp = (temp) => {
    const tempInt = parseInt(temp);
    if (Number.isNaN(tempInt) === false && temp.length > 0) {
      if (tempType === "set-temp" && tempInt >= 1 && tempInt <= 86) return true;
      if (tempType === "inc-temp-x" && tempInt >= 1 && tempInt <= 26) return true;
      if (tempType === "dec-temp-x" && tempInt >= 1 && tempInt <= 26) return true;
    }
    return false;
  };
  const handleInput = (e) => {
    const temp = e.target.value;
    if (temp.length === 0) updateTemp("");
    else if (validTemp(temp)) {
      updateTemp(temp);
    }
  };
  const labels = getTempLabel();
  return (
    <div className="sched-step-container">
      <h1 className="sched-step-title">Set Temp</h1>
      <div className="sched-step-body-row">
        <strong className="temp-input-labels">{labels[0]}</strong>
        <input pattern="[0-9]*" placeholder={labels[1]} className="temp-input" onChange={handleInput} value={tempVal.temp} type="number" />
        <strong className="temp-input-labels">°</strong>

      </div>
    </div>
  );
}
TempInput.propTypes = {
  tempType: PropTypes.string.isRequired,
  tempVal: PropTypes.shape({
    temp: PropTypes.number.isRequired,
    ready: PropTypes.bool.isRequired,
  }).isRequired,
  handleTempUpdate: PropTypes.func.isRequired,
};
