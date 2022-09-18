import React from "react";
import PropTypes from "prop-types";

export default function Temp5deg({ handleClick, direction }) {
  return (
    <button type="button" className={`temp5deg temp5deg-${direction}`} onClick={handleClick}>
      <h3 className="temp5deg-label">{direction === "cold" ? "-5°" : "+5°"}</h3>
    </button>
  );
}
Temp5deg.propTypes = {
  handleClick: PropTypes.func.isRequired,
  direction: PropTypes.string.isRequired,
};
