import React from "react";
import PropTypes from "prop-types";

export default function PowerBtn({ handlePower }) {
  return (
    <button type="button" onClick={handlePower} className="power-btn">
      <svg xmlns="http://www.w3.org/2000/svg" width="65" height="65">
        <g data-name="Group 3" transform="translate(-20 -13)">
          <circle data-name="Ellipse 1" cx="32.5" cy="32.5" r="32.5" transform="translate(20 13)" fill="#a95050" />
          <g data-name="5402411_down_log_off_out_power_icon" fill="#f3f4f6">
            <path data-name="Path 1" d="M52.168 49.486a2.649 2.649 0 0 1-2.649-2.648V25.649a2.65 2.65 0 1 1 5.3 0v21.189a2.649 2.649 0 0 1-2.651 2.648Z" />
            <path data-name="Path 2" d="M52.167 68.027a21.189 21.189 0 0 1-12.1-38.564 2.649 2.649 0 1 1 3.019 4.344 15.892 15.892 0 1 0 18.17 0 2.649 2.649 0 0 1 3.016-4.344 21.189 21.189 0 0 1-12.1 38.564Z" />
          </g>
        </g>
      </svg>
    </button>
  );
}
PowerBtn.propTypes = {
  handlePower: PropTypes.func.isRequired,
};
