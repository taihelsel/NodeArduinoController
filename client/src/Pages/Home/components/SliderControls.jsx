import React from "react";
import PropTypes from "prop-types";

export default function SliderControls({ handleSliderCancel, handleSliderConfirm }) {
  return (
    <div id="controls-container">
      <div className="home-btns-row">
        <button type="button" className="temp-slider-controls temp-slider-cancel" onClick={handleSliderCancel}><h3>Cancel</h3></button>
        <button type="button" className="temp-slider-controls temp-slider-confirm" onClick={handleSliderConfirm}><h3>Confirm</h3></button>
      </div>
    </div>
  );
}
SliderControls.propTypes = {
  handleSliderCancel: PropTypes.func.isRequired,
  handleSliderConfirm: PropTypes.func.isRequired,
};
