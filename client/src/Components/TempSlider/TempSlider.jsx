import React from "react";
import PropTypes from "prop-types";
import { CircleSlider } from "react-circle-slider";
import "./TempSlider.css";

export default function TempSlider({ handleSliderChange, tempVal }) {
  const handleChange = (e) => {
    handleSliderChange(e);
  };
  return (
    <div className="temp-slider">
      <CircleSlider
        value={tempVal}
        min={60}
        max={86}
        size={330}
        showTooltip
        gradientColorFrom="#DC6969"
        gradientColorTo="#69C1DC"
        onChange={handleChange}
        tooltipColor="#F3F4F6"
        tooltipSize={48}
        circleColor="#3F434D"
      />
    </div>
  );
}
TempSlider.propTypes = {
  handleSliderChange: PropTypes.func.isRequired,
  tempVal: PropTypes.number.isRequired,
};
