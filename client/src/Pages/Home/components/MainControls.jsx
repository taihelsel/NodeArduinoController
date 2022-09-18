import React from "react";
import PropTypes from "prop-types";
import Temp5deg from "./Temp5deg";
import ManageSchedulesBtn from "./ManageSchedulesBtn";

export default function MainControls({
  decreaseTempClick,
  increaseTempClick,
  handleSchedClick,
}) {
  return (
    <div id="controls-container">
      <div className="home-btns-row">
        <Temp5deg handleClick={decreaseTempClick} direction="cold" />
        <Temp5deg handleClick={increaseTempClick} direction="hot" />
      </div>
      <div className="home-btns-row">
        <ManageSchedulesBtn handleClick={handleSchedClick} />
      </div>
    </div>
  );
}
MainControls.propTypes = {
  decreaseTempClick: PropTypes.func.isRequired,
  increaseTempClick: PropTypes.func.isRequired,
  handleSchedClick: PropTypes.func.isRequired,
};
