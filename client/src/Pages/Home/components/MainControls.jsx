import React from "react";
import Temp5deg from "./Temp5deg";
import ManageSchedulesBtn from "./ManageSchedulesBtn";

export default function MainControls({ decreaseTempClick, increaseTempClick, handleSchedClick }) {
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
